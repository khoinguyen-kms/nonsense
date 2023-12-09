import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";


const configService = new ConfigService();

export const mysqlConfig: MysqlConnectionOptions = {
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'nonsense_development',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  dropSchema: false,
  migrations: ['dist/migrations/*.ts'],
  migrationsTableName: 'migration_versions',
  logging: true
}

export default new DataSource(mysqlConfig);