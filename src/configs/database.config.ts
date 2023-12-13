import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const mysqlConfig: MysqlConnectionOptions & SeederOptions = {
  name: 'default',
  type: 'mysql',
  host: 'mysql_container',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nonsense_development',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  dropSchema: false,
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'migration_versions',
  seeds: ['./dist/db/seeds/*{.ts,.js}'],
  factories: ['./dist/db/**/*.factory{.ts,.js}'],
  poolSize: 5,
  logging: true,
};

export default new DataSource(mysqlConfig);
