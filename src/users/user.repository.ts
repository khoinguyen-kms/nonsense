import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource?.createEntityManager());
  }

  async findByUsername(username: string) {
    return await this.findOne({
      where: {
        username,
      },
    });
  }
}
