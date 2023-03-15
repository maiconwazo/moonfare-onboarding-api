import { StepStatusEnum } from '../entities/onboarding-instance-step.entity';
import { OnboardingResponse } from '../onboarding';

export class ResumeResponseDTO {
  constructor(
    private instanceId: string,
    private currentStep: string,
    private currentStepOrder: number,
    private currentStepStatus: StepStatusEnum,
    private isCompleted: boolean,
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
        },
        isCompleted: this.isCompleted,
      },
    } as OnboardingResponse;
  }
}
