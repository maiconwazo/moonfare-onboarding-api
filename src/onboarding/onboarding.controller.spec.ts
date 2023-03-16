import { Metadata } from '@grpc/grpc-js';
import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingController } from './onboarding.controller';
import { InstanceIdMissingException } from './onboarding.exceptions';
import { OnboardingService } from './onboarding.service';

describe('OnboardingController', () => {
  let controller: OnboardingController;

  const mockOnboardingService = {
    startAsync: () => {
      return {
        toGrpcMessage: () => {
          return {};
        },
      };
    },
    getInformationAsync: () => {
      return {
        toGrpcMessage: () => {
          return {};
        },
      };
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnboardingController],
      providers: [OnboardingService],
    })
      .overrideProvider(OnboardingService)
      .useValue(mockOnboardingService)
      .compile();

    controller = module.get<OnboardingController>(OnboardingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should not require an instanceId', async () => {
    await expect(controller.start()).resolves.not.toThrowError();
    await expect(controller.getInformation()).resolves.not.toThrowError();
  });

  it('should require an instanceId', async () => {
    const metadata = new Metadata();

    await expect(controller.resume({}, metadata)).rejects.toThrow(
      InstanceIdMissingException,
    );

    await expect(controller.execute({ input: '' }, metadata)).rejects.toThrow(
      InstanceIdMissingException,
    );

    await expect(controller.rollback({ input: '' }, metadata)).rejects.toThrow(
      InstanceIdMissingException,
    );

    await expect(controller.delete({ input: '' }, metadata)).rejects.toThrow(
      InstanceIdMissingException,
    );
  });
});
