import { OnboardingInformationResponse } from '../onboarding';

export class GetInformationResponseDTO {
  constructor(public totalStepCount: number) {}

  toGrpcMessage() {
    return {
      success: true,
      error: null,
      data: {
        totalStepCount: this.totalStepCount,
      },
    } as OnboardingInformationResponse;
  }
}
