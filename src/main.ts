// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

async function bootstrap() {
  const server = express();

  // ✅ Tambahkan CORS middleware di sini
  server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,POST,OPTIONS,PUT,DELETE',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }

    next();
  });

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init(); // ⚠️ BUKAN listen!

  // ❌ Jangan pakai app.listen(...) karena tidak akan dipanggil di Vercel
}
bootstrap();
