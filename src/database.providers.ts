import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { createDatabase } from 'typeorm-extension';
import { dataSourceOptions } from './configs/datasource.config';

config();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async () => {
      // if (process.env.NODE_ENV === 'development')
      //   await dropDatabase({ options: dataSourceOptions });

      await createDatabase({ options: dataSourceOptions });
      const dataSource = new DataSource(dataSourceOptions);
      await dataSource.initialize();

      return dataSource;
    },
  },
];
