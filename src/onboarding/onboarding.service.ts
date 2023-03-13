import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InstanceEntity } from './entities/onboarding-instance.entity';
import { v4 } from 'uuid';
import { StartResponseDTO } from './dto/start-response.dto';
import { ExecuteResponseDTO } from './dto/execute-reponse.dto';
import { FlowEntity } from './entities/onboarding-flow.entity';
import {
  InstanceStepEntity,
  StepStatusEnum,
} from './entities/onboarding-instance-step.entity';
import { DeleteResponseDTO } from './dto/delete-response.dto';
import { ResumeResponseDTO } from './dto/resume-response.dto';
import {
  InstanceNotFoundException,
  RetrieveStepException,
} from './onboarding.exceptions';
import { FlowStepEntity } from './entities/onboarding-flow-step.entity';

@Injectable()
export class OnboardingService {
  constructor(
    @Inject('INSTANCE_REPOSITORY')
    private instanceRepository: Repository<InstanceEntity>,
    @Inject('FLOW_REPOSITORY')
    private flowRepository: Repository<FlowEntity>,
  ) {}

  async start(): Promise<StartResponseDTO> {
    const defaultFlow = await this.flowRepository.findOne({
      where: {
        isDefault: true,
      },
      relations: {
        steps: {
          flow: true,
        },
      },
    });

    if (!defaultFlow?.steps?.length) throw new RetrieveStepException();

    const sortedSteps = defaultFlow.steps.sort((a, b) => a.order - b.order);
    const firstStep = sortedSteps[0];

    const instance = new InstanceEntity();
    instance.id = v4();
    instance.flow = defaultFlow;

    const instanceStep = new InstanceStepEntity();
    instanceStep.id = v4();
    instanceStep.instance = instance;
    instanceStep.flowStep = firstStep;
    instanceStep.status = StepStatusEnum.pending;
    instance.steps = [instanceStep];

    this.instanceRepository.save(instance);
    return new StartResponseDTO(instance.id, firstStep.name);
  }

  async resume(instanceId: string): Promise<ResumeResponseDTO> {
    const instance = await this.instanceRepository.findOne({
      where: {
        id: instanceId,
      },
      relations: {
        steps: {
          flowStep: true,
        },
        flow: {
          steps: true,
        },
      },
    });

    if (!instance) throw new InstanceNotFoundException();

    const pendingInstanceStep = this.getPedingInstanceStep(instance);
    if (pendingInstanceStep)
      return new ResumeResponseDTO(
        instance.id,
        pendingInstanceStep.flowStep.name,
        false,
      );

    console.log(instance.steps);
    const nextFlowStep = this.getNextFlowStep(instance);

    if (nextFlowStep)
      return new ResumeResponseDTO(instance.id, nextFlowStep.name, false);

    return new ResumeResponseDTO(instance.id, '', true);
  }

  async execute(instanceId: string): Promise<ExecuteResponseDTO> {
    const instance = await this.instanceRepository.findOne({
      where: {
        id: instanceId,
      },
      relations: {
        steps: {
          flowStep: true,
        },
        flow: {
          steps: true,
        },
      },
    });

    if (!instance) throw new InstanceNotFoundException();

    const pendingInstanceStep = this.getPedingInstanceStep(instance);
    if (pendingInstanceStep)
      pendingInstanceStep.status = StepStatusEnum.completed;

    const nextFlowStep = this.getNextFlowStep(instance);
    if (nextFlowStep) {
      const newInstanceStep = new InstanceStepEntity();
      newInstanceStep.id = v4();
      newInstanceStep.instance = instance;
      newInstanceStep.flowStep = nextFlowStep;
      newInstanceStep.status = StepStatusEnum.pending;
      instance.steps.push(newInstanceStep);

      await this.instanceRepository.save(instance);
      return new ExecuteResponseDTO(
        instance.id,
        newInstanceStep?.flowStep?.name,
        false,
      );
    } else {
      await this.instanceRepository.save(instance);
      return new ExecuteResponseDTO(instance.id, '', true);
    }
  }

  async delete(instanceId: string): Promise<DeleteResponseDTO> {
    const instance = await this.instanceRepository.findOne({
      where: {
        id: instanceId,
      },
      relations: {
        steps: true,
      },
    });

    if (!instance) return new DeleteResponseDTO();

    await this.instanceRepository.remove(instance);
    return new DeleteResponseDTO();
  }

  getPedingInstanceStep(instance: InstanceEntity): InstanceStepEntity {
    const pendingInstanceStep = instance.steps.filter(
      (step) => step.status === StepStatusEnum.pending,
    )[0];

    return pendingInstanceStep;
  }

  getNextFlowStep(instance: InstanceEntity): FlowStepEntity {
    const sortedCompletedInstanceSteps = instance.steps
      .filter((step) => step.status === StepStatusEnum.completed)
      .sort((a, b) => a.flowStep.order - b.flowStep.order);

    const sortedFlowSteps = instance.flow.steps.sort(
      (a, b) => a.order - b.order,
    );

    const lastCompletedStep =
      sortedCompletedInstanceSteps[sortedCompletedInstanceSteps.length - 1];

    return sortedFlowSteps.find(
      (step) => step.order > lastCompletedStep.flowStep.order ?? -1,
    );
  }
}
