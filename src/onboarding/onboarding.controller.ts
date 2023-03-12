import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ExecuteRequest,
  ExecuteResponse,
  StartRequest,
  StartResponse,
} from './onboarding';
import { OnboardingService } from './onboarding.service';

@Controller()
export class OnboardingController {
  constructor(private onboardingService: OnboardingService) {}

  @GrpcMethod('OnboardingService', 'Start')
  async start(
    data: StartRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Promise<StartResponse> {
    const result = await this.onboardingService.start();
    return result.toGrpcMessage();
  }

  @GrpcMethod('OnboardingService', 'Execute')
  async execute(
    data: ExecuteRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Promise<ExecuteResponse> {
    const result = await this.onboardingService.execute(data.instanceId);

    if (!result) throw new NotFoundException('InstanceId was not found!');

    return result.toGrpcMessage();
  }
}
