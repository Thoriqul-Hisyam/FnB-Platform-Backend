import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from './app.module';

const server = express();

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    // Enable CORS
    app.enableCors({
      origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        ...(process.env.ALLOWED_ORIGINS?.split(',') || []),
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: true,
    });

    // Global prefix (optional)
    app.setGlobalPrefix('api/v1');

    await app.init();

    const port = process.env.PORT || 3001;
    await app.listen(port);

    console.log(`Server running on http://localhost:${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);

    // Graceful shutdown handling
    const gracefulShutdown = async (signal: string) => {
      console.log(`Received ${signal}, shutting down gracefully...`);
      await app.close();
      process.exit(0);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();

export default server;
