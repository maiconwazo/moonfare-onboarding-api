import { StepStatusEnum } from '../entities/onboarding-instance-step.entity';
import { OnboardingResponse } from '../onboarding';

export class StartResponseDTO {
  constructor(
    public instanceId: string,
    public firstStep: string,
    public firstStepOrder: number,
    public firstStepStatus: StepStatusEnum,
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
