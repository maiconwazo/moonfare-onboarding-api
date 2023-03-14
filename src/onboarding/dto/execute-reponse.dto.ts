import { OnboardingResponse } from '../onboarding';

export class ExecuteResponseDTO {
  constructor(
    private instanceId: string,
    private nextStep: string,
    private isCompleted: boolean,
    private nextStepOrder: number,
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
        },
        isCompleted: this.isCompleted,
      },
    } as OnboardingResponse;
  }
}
