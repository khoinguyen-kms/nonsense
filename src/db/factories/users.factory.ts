import { Faker } from "@faker-js/faker";
import { User } from "src/entities/user.entity";
import { UserRole } from "src/shared/enums/userRole.enum";
import { setSeederFactory } from "typeorm-extension";

export const UsersFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.username = faker.internet.userName();
  user.email = faker.internet.email();
  user.password = faker.word.verb({ strategy: 'longest' });
  user.dateOfBirth = faker.date.birthdate();
  user.roles = [UserRole.USER]
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.address = faker.person.jobArea();
  user.phoneNumber = faker.phone.number();
  user.avatarUrl = faker.image.url();

  return user;
})
