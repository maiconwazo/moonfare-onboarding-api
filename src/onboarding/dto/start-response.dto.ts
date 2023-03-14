import { OnboardingResponse } from '../onboarding';

export class StartResponseDTO {
  constructor(
    private instanceId: string,
    private firstStep: string,
    private firstStepOrder: number,
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
        },
      },
    } as OnboardingResponse;
  }
}
