import { User } from 'src/entities/user.entity';
import { UserRole } from 'src/shared/enums/userRole.enum';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';

export class UserSeeder1702274926375 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    await userRepository.insert([
      {
        email: 'superadmin@nonsense.com',
        username: 'superadmin',
        password: await bcrypt.hash('password', 10),
        firstName: 'superadmin',
        lastName: 'superadmin',
        roles: [UserRole.ADMIN],
      },
    ]);

    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(20);
  }
}
