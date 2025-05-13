import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000', // alamat frontend Next.js
      credentials: true, // jika pakai cookies atau auth header
    },
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
