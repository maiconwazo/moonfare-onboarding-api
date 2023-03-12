import { DataSource } from 'typeorm';
import { InstanceEntity } from './entities/onboarding-instance.entity';

export const onboardingProviders = [
  {
    provide: 'INSTANCE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InstanceEntity),
    inject: ['DATA_SOURCE'],
  },
];
