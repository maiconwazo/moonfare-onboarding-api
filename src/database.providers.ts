import { getDataSourceToken } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { createDatabase } from 'typeorm-extension';
import { dataSourceOptions } from './configs/datasource.config';

config();

export const databaseProviders = [
  {
    provide: getDataSourceToken(),
    useFactory: async () => {
      await createDatabase({ options: dataSourceOptions });
      const dataSource = new DataSource(dataSourceOptions);
      await dataSource.initialize();

      return dataSource;
    },
  },
];
