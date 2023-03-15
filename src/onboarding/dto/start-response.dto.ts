import { StepStatusEnum } from '../entities/onboarding-instance-step.entity';
import { OnboardingResponse } from '../onboarding';

export class StartResponseDTO {
  constructor(
    private instanceId: string,
    private firstStep: string,
    private firstStepOrder: number,
    private firstStepStatus: StepStatusEnum,
  ) {}

  toGrpcMessage() {
    return {
      instanceId: this.instanceId,
      success: true,
      error: null,
      data: {
        currentStep: {
          name: this.firstStep,
          order: this.firstStepOrder,
          status: this.firstStepStatus,
        },
      },
    } as OnboardingResponse;
  }
}
