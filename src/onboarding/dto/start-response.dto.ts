import { StartResponse } from '../onboarding';

export class StartResponseDTO {
  constructor(private instanceId: string) {}

  toGrpcMessage() {
    return {
      instanceId: this.instanceId,
    } as StartResponse;
  }
}
