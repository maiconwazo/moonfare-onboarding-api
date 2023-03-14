import { RpcException } from '@nestjs/microservices';

export class InstanceIdMissingException extends RpcException {
  constructor() {
    super({
      code: 10,
      message: 'InstanceId missing.',
    });
  }
}

export class RetrieveStepException extends RpcException {
  constructor() {
    super({
      code: 13,
      message: 'Failed to retrieve current step.',
    });
  }
}

export class InstanceNotFoundException extends RpcException {
  constructor() {
    super({
      code: 13,
      message: 'Instance was not found.',
    });
  }
}
