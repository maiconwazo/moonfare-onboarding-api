import { OnboardingResponse } from '../onboarding';

export class ResumeResponseDTO {
  constructor(
    private instanceId: string,
    private currentStep: string,
    private isCompleted: boolean,
    private currentStepOrder: number,
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
        },
        isCompleted: this.isCompleted,
      },
    } as OnboardingResponse;
  }
}
