import { OnboardingResponse } from '../onboarding';

export class ExecuteResponseDTO {
  constructor(
    private instanceId: string,
    private nextStep: string,
    private isCompleted: boolean,
  ) {}

  toGrpcMessage() {
    return {
      instanceId: this.instanceId,
      success: true,
      error: null,
      data: {
        currentStep: this.nextStep,
        isCompleted: this.isCompleted,
      },
    } as OnboardingResponse;
  }
}
