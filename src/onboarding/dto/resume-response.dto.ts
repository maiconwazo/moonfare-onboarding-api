import { StepStatusEnum } from '../entities/onboarding-instance-step.entity';
import { OnboardingResponse } from '../onboarding';

export class ResumeResponseDTO {
  constructor(
    public instanceId: string,
    public currentStep: string,
    public currentStepOrder: number,
    public currentStepStatus: StepStatusEnum,
    public isCompleted: boolean,
    public extraData: string,
  ) {}

  toGrpcMessage() {
    return {
      instanceId: this.instanceId,
      success: true,
      error: null,
      data: {
        currentStep: {
          name: this.currentStep,
          order: this.currentStepOrder,
          status: this.currentStepStatus,
          extra: this.extraData,
        },
        isCompleted: this.isCompleted,
      },
    } as OnboardingResponse;
  }
}
