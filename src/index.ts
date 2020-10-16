import dotenv from 'dotenv';
dotenv.config();

import App from './app';

(async function bootstrap() {
  const app = new App();

  await app.run();

  process.on('SIGTERM', () => app.exit());
})();
