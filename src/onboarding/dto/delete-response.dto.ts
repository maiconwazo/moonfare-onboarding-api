import { OnboardingResponse } from '../onboarding';

export class DeleteResponseDTO {
  toGrpcMessage() {
    return {
      success: true,
      error: null,
      data: {},
    } as OnboardingResponse;
  }
}
