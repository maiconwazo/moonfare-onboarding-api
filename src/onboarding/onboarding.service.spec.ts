import { ClientRMQ } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { FlowEntity } from './entities/onboarding-flow.entity';
import { InstanceEntity } from './entities/onboarding-instance.entity';
import { OnboardingService } from './onboarding.service';

describe('OnboardingService', () => {
  let service: OnboardingService;

  const mockRepository = {};
  const mockClientRMQ = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OnboardingService,
        {
          provide: 'FLOW_REPOSITORY',
          useValue: mockRepository,
        },
        {
          provide: 'INSTANCE_REPOSITORY',
          useValue: mockRepository,
        },
        {
          provide: 'DOCUMENT_SERVICE',
          useValue: mockClientRMQ,
        },
        {
          provide: 'USER_SERVICE',
          useValue: mockClientRMQ,
        },
      ],
    }).compile();

    service = module.get<OnboardingService>(OnboardingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
