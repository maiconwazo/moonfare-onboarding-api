import { OnboardingResponse } from '../onboarding';

export class StartResponseDTO {
  constructor(private instanceId: string, private firstStep: string) {}

  toGrpcMessage() {
    return {
      instanceId: this.instanceId,
      success: true,
      error: null,
      data: {
        currentStep: this.firstStep,
      },
    } as OnboardingResponse;
  }
}
