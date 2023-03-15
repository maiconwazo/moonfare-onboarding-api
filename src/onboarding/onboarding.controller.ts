import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Empty } from './google/protobuf/empty';
import {
  OnboardingInformationResponse,
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

    if (!instanceId || instanceId === 'undefined')
      throw new InstanceIdMissingException();

    const result = await this.onboardingService.resumeAsync(instanceId);
    return result.toGrpcMessage();
  }

  @GrpcMethod('OnboardingService', 'Execute')
  async execute(
    request: OnboardingRequest,
    metadata?: Metadata,
  ): Promise<OnboardingResponse> {
    const instanceId = metadata.toJSON().instanceid.toString();

    if (!instanceId || instanceId === 'undefined')
      throw new InstanceIdMissingException();

    const result = await this.onboardingService.executeAsync(
      instanceId,
      request.input,
    );
    return result.toGrpcMessage();
  }

  @GrpcMethod('OnboardingService', 'Rollback')
  async rollback(_: Empty, metadata?: Metadata): Promise<OnboardingResponse> {
    const instanceId = metadata.toJSON().instanceid.toString();

    if (!instanceId || instanceId === 'undefined')
      throw new InstanceIdMissingException();

    const result = await this.onboardingService.rollbackAsync(instanceId);
    return result.toGrpcMessage();
  }

  @GrpcMethod('OnboardingService', 'Delete')
  async delete(_: Empty, metadata?: Metadata): Promise<OnboardingResponse> {
    const instanceId = metadata.toJSON().instanceid.toString();

    if (!instanceId || instanceId === 'undefined')
      throw new InstanceIdMissingException();

    const result = await this.onboardingService.deleteAsync(instanceId);
    return result.toGrpcMessage();
  }

  @GrpcMethod('OnboardingService', 'GetInformation')
  async getInformation(): Promise<OnboardingInformationResponse> {
    const result = await this.onboardingService.getInformation();
    return result.toGrpcMessage();
  }
}
