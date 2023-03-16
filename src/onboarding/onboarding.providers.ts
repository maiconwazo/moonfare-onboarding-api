import { getRepositoryToken, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { FlowEntity } from './entities/onboarding-flow.entity';
import { InstanceEntity } from './entities/onboarding-instance.entity';

export const onboardingProviders = [
  {
    provide: getRepositoryToken(FlowEntity),
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FlowEntity),
    inject: [getDataSourceToken()],
  },
  {
    provide: getRepositoryToken(InstanceEntity),
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InstanceEntity),
    inject: [getDataSourceToken()],
  },
];
