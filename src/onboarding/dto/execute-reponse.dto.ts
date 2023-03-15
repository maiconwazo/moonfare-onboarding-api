import { StepStatusEnum } from '../entities/onboarding-instance-step.entity';
import { OnboardingResponse } from '../onboarding';

export class ExecuteResponseDTO {
  constructor(
    private instanceId: string,
    private nextStep: string,
    private nextStepOrder: number,
    private nextStepStatus: StepStatusEnum,
    private isCompleted: boolean,
  ) {}

  toGrpcMessage() {
    return {
      instanceId: this.instanceId,
      success: true,
      error: null,
      data: {
        currentStep: {
          name: this.nextStep,
          order: this.nextStepOrder,
          status: this.nextStepStatus,
        },
        isCompleted: this.isCompleted,
      },
    } as OnboardingResponse;
  }
}
