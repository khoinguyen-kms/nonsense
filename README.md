<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

---

## Description
This project is run by [Nest](https://github.com/nestjs/nest) framework TypeScript.

## Installation
```bash
# via Docker
# It will setup the enviroment includes: Mysql 8.0.x, Setup project and seeds the data
docker-compose up --build -d 

# via yarn
yarn
```

## Running the app
|> If you build up by Docker, these process don't have to be ran again

```bash
# development
yarn run start

# watch mode
yarn run start:dev
```

## Test

```bash
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```
## Seed datas
There would be 21 users includes `superadmin` account as:
```javascript
{
    username: "superadmin",
    password: "password"
}
```
If you run mannually with `yarn`: `yarn db:seed` is the tool you need

## OpenAPI integration
You could access the swagger via url `http://localhost:3000/swagger`

## Features could be enhanced in the future
- [ ] Write more tests to cover all the services.
- [ ] Bulk delete users/classes by ids by pusing to queue in order to process later.
- [ ] Upload user's avatar and store in S3 (localstack/AWS).
- [ ] Generate list of users/classes in CSV format.
- [ ] Implement more security for users includes: `Lockable`, `Forget password`, `Welcome email`, `last login time`.
- [ ] Refactor the codebase with more generic approach.
