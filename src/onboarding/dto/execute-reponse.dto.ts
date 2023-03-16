import { StepStatusEnum } from '../entities/onboarding-instance-step.entity';
import { OnboardingResponse } from '../onboarding';

export class ExecuteResponseDTO {
  constructor(
    public instanceId: string,
    public nextStep: string,
    public nextStepOrder: number,
    public nextStepStatus: StepStatusEnum,
    public isCompleted: boolean,
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
