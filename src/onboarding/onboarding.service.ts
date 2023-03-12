import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InstanceEntity } from './entities/onboarding-instance.entity';
import { v4 } from 'uuid';
import { StartResponseDTO } from './dto/start-response.dto';
import { ExecuteResponseDTO } from './dto/execute-reponse.dto';

@Injectable()
export class OnboardingService {
  constructor(
    @Inject('INSTANCE_REPOSITORY')
    private onboardingRepository: Repository<InstanceEntity>,
  ) {}

  async start(): Promise<StartResponseDTO> {
    const newOnboardingEntity = new InstanceEntity();
    newOnboardingEntity.id = v4();

    this.onboardingRepository.save(newOnboardingEntity);
    return new StartResponseDTO(newOnboardingEntity.id);
  }

  async execute(instanceId: string): Promise<ExecuteResponseDTO> {
    const process = await this.onboardingRepository.findOne({
      where: {
        id: instanceId,
      },
    });

    if (!process) return undefined;

    return new ExecuteResponseDTO(instanceId, 'test');
  }
}
