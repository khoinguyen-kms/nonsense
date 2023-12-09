import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const port = process.env.NEST_APP_LOCAL_PORT;
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  await app.listen(port).then((_value) => {
    console.log(`Server started at http://localhost:${port}`)
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap(); 
