import { DataSourceOptions } from 'typeorm';
import { FlowStepEntity } from '../onboarding/entities/onboarding-flow-step.entity';
import { FlowEntity } from '../onboarding/entities/onboarding-flow.entity';
import { InstanceStepEntity } from '../onboarding/entities/onboarding-instance-step.entity';
import { InstanceEntity } from '../onboarding/entities/onboarding-instance.entity';
import { config } from 'dotenv';
import { CreateFlowTableAndValues1678638263510 } from 'src/migrations/1678638263510-CreateFlowTableAndValues';
import { CreateInstanceTable1678638299257 } from 'src/migrations/1678638299257-CreateInstanceTable';

config();

export const dataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: [
    FlowStepEntity,
    FlowEntity,
    InstanceStepEntity,
    InstanceEntity,
  ],
  migrations: [
    CreateFlowTableAndValues1678638263510,
    CreateInstanceTable1678638299257,
  ],
  migrationsRun: true,
} as DataSourceOptions;
