import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CoreModule } from './core/core.module';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);

  const config = new DocumentBuilder()
    .setTitle('Event Manager')
    .setDescription(
      'An event manager application that handles the authentication and creation of events.',
    )
    .setVersion('1.0')
    .addTag('event-manager')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
