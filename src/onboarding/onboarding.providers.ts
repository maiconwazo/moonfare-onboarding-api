import { DataSource } from 'typeorm';
import { FlowEntity } from './entities/onboarding-flow.entity';
import { InstanceEntity } from './entities/onboarding-instance.entity';

export const onboardingProviders = [
  {
    provide: 'FLOW_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FlowEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'INSTANCE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InstanceEntity),
    inject: ['DATA_SOURCE'],
  },
];
