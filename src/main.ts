import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up session middleware
  app.use(
    session({
      secret: 'your-secret-key', // replace with a strong secret key
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 360000000, // 100 hour
      },
    }),
  );

  // Initialize passport and session
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
