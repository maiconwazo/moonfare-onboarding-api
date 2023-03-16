import { Test } from '@nestjs/testing';
import { ResumeResponseDTO } from './dto/resume-response.dto';
import { StepStatusEnum } from './entities/onboarding-instance-step.entity';
import {
  mockedFlow,
  mockedInstances,
  mockedOnboardingProviders,
  mockedSteps,
} from './onboarding.providers.tests';
import { OnboardingService } from './onboarding.service';

describe('OnboardingService', () => {
  let service: OnboardingService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OnboardingService,
        ...mockedOnboardingProviders,
        {
          provide: 'DOCUMENT_SERVICE',
          useValue: {},
        },
        {
          provide: 'USER_SERVICE',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<OnboardingService>(OnboardingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getInformationAsync: should return the count of steps of the default flow', async () => {
    const getInformationResponse = await service.getInformationAsync();

    expect(getInformationResponse).toBeDefined();
    expect(getInformationResponse.totalStepCount).toEqual(
      mockedFlow.find((x) => x.isDefault)?.steps?.length ?? 0,
    );
  });

  it('startAsync: should generate a new intanceId and the first step of the flow', async () => {
    const firstStep = mockedSteps[0];
    const startResponse = await service.startAsync();

    expect(startResponse).toBeDefined();
    expect(startResponse.instanceId).toBeDefined();
    expect(startResponse.firstStep).toEqual(firstStep.name);
    expect(startResponse.firstStepOrder).toEqual(firstStep.order);
    expect(startResponse.firstStepStatus).toEqual(StepStatusEnum.started);
  });

  it('resumeAsync: should return the current step for this instance', async () => {
    const instance = mockedInstances[1];
    const instanceStep = instance.steps[instance.steps.length - 1];
    const resumeResponse = (await service.resumeAsync(
      instance.id,
    )) as ResumeResponseDTO;

    expect(resumeResponse).toBeDefined();
    expect(resumeResponse).toBeInstanceOf(ResumeResponseDTO);
    expect(resumeResponse.instanceId).toEqual(instance.id);
    expect(resumeResponse.isCompleted).toEqual(false);
    expect(resumeResponse.currentStep).toEqual(instanceStep.flowStep.name);
    expect(resumeResponse.currentStepOrder).toEqual(
      instanceStep.flowStep.order,
    );
    expect(resumeResponse.currentStepStatus).toEqual(instanceStep.status);
    expect(resumeResponse.extraData).toEqual(instanceStep.data);
  });

  it('executeAsync: should generate and return the next step for this instance', async () => {
    const nextStepForThisInstance = mockedSteps[1];
    const instance = mockedInstances[0];
    const executeReponse = await service.executeAsync(
      instance.id,
      JSON.stringify({}),
    );

    expect(executeReponse).toBeDefined();
    expect(executeReponse.instanceId).toEqual(instance.id);
    expect(executeReponse.isCompleted).toEqual(false);
    expect(executeReponse.nextStep).toEqual(nextStepForThisInstance.name);
    expect(executeReponse.nextStepOrder).toEqual(nextStepForThisInstance.order);
    expect(executeReponse.nextStepStatus).toEqual(StepStatusEnum.started);
  });

  it('rollbackAsync: should delete the last step and return the current step for this instance', async () => {
    const nextStepForThisInstance = mockedSteps[0];
    const instance = mockedInstances[1];
    const rollbackResponse = await service.rollbackAsync(instance.id);

    expect(rollbackResponse).toBeDefined();
    expect(rollbackResponse.instanceId).toEqual(instance.id);
    expect(rollbackResponse.isCompleted).toEqual(false);
    expect(rollbackResponse.currentStep).toEqual(nextStepForThisInstance.name);
    expect(rollbackResponse.currentStepOrder).toEqual(
      nextStepForThisInstance.order,
    );
    expect(rollbackResponse.currentStepStatus).toEqual(StepStatusEnum.started);
  });

  it('deleteAsync: should delete the this instance', async () => {
    const instance = mockedInstances[0];
    await expect(service.deleteAsync(instance.id)).resolves.not.toThrowError();
  });
});
