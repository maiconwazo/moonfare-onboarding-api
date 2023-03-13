import { OnboardingResponse } from '../onboarding';

export class ResumeResponseDTO {
  constructor(
    private instanceId: string,
    private currentStep: string,
    private isCompleted: boolean,
  ) {}

  toGrpcMessage() {
    return {
      instanceId: this.instanceId,
      success: true,
      error: null,
      data: {
        currentStep: this.currentStep,
        isCompleted: this.isCompleted,
      },
    } as OnboardingResponse;
  }
}
