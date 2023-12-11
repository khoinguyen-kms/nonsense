import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Nonsense Application')
  .setDescription('List apis from nonsense app')
  .setVersion('1.0')
  .addTag('Auth')
  .addTag('Admin')
  .addTag('Users')
  .addBearerAuth()
  .build();
