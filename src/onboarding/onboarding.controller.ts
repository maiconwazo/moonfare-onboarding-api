import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Empty } from './google/protobuf/empty';
import {
  OnboardingRequest,
  OnboardingResponse,
  OnboardingServiceController,
} from './onboarding';
import { InstanceIdMissingException } from './onboarding.exceptions';
import { OnboardingService } from './onboarding.service';

@Controller()
export class OnboardingController implements OnboardingServiceController {
  constructor(private onboardingService: OnboardingService) {}

  @GrpcMethod('OnboardingService', 'Start')
  async start(): Promise<OnboardingResponse> {
    const result = await this.onboardingService.start();
    return result.toGrpcMessage();
  }

  @GrpcMethod('OnboardingService', 'Resume')
  async resume(_: Empty, metadata?: Metadata): Promise<OnboardingResponse> {
    const instanceId = metadata.toJSON().instanceid.toString();

    if (!instanceId) throw new InstanceIdMissingException();

    const result = await this.onboardingService.resume(instanceId);
    return result.toGrpcMessage();
  }

  @GrpcMethod('OnboardingService', 'Execute')
  async execute(
    _: OnboardingRequest,
    metadata?: Metadata,
  ): Promise<OnboardingResponse> {
    const instanceId = metadata.toJSON().instanceid.toString();

    if (!instanceId) throw new InstanceIdMissingException();

    const result = await this.onboardingService.execute(instanceId);
    return result.toGrpcMessage();
  }

  @GrpcMethod('OnboardingService', 'Delete')
  async delete(_: Empty, metadata?: Metadata): Promise<OnboardingResponse> {
    const instanceId = metadata.toJSON().instanceid.toString();

    if (!instanceId) throw new InstanceIdMissingException();

    const result = await this.onboardingService.delete(instanceId);
    return result.toGrpcMessage();
  }
}
