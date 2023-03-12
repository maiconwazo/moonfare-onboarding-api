import { ExecuteResponse } from '../onboarding';

export class ExecuteResponseDTO {
  constructor(private instanceId: string, private nextStep: string) {}

  toGrpcMessage() {
    return {
      instanceId: this.instanceId,
      nextStep: this.nextStep,
    } as ExecuteResponse;
  }
}
