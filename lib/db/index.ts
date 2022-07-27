import { DataSource } from 'typeorm';

import { TinyURL } from './TinyURL';

export { TinyURL } from './TinyURL';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.NODE_ENV === 'production' ? 'postgres' : 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [TinyURL],
  synchronize: !(process.env.NODE_ENV === 'production'),
  logging: !(process.env.NODE_ENV === 'production'),
});

AppDataSource.initialize()
  .then(async () => {
    console.log('Connection initialized');
  })
  .catch((error) => console.log(error));

export const getDataSource = (delay = 3000): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject('Failed to create connection with db...');
    }, delay);
  });
};
