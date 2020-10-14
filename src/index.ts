import dotenv from 'dotenv';
dotenv.config();

import App from './app';

function bootstrap() {

  const app = new App();

  app.run();
}

bootstrap();
