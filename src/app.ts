import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import environments from '@config/environments';

class App {
  private readonly app: Express;

  constructor() {
    dotenv.config();

    this.app = express();
  }

  private setGlobalMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  public run(): void {
    this.setGlobalMiddlewares();

    this.app.listen(environments.PORT);
  }
}

export default App;
