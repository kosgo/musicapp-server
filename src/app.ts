import express, { Express } from 'express';
import cors from 'cors';

import { environments } from './config';
import { authController } from './controllers';

class App {
  private readonly app: Express;

  constructor() {
    this.app = express();
  }

  private setGlobalMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private setupControllers(): void {
    this.app.use(authController.register());
  }

  public run(): void {
    this.setGlobalMiddlewares();
    this.setupControllers();

    this.app.listen(environments.PORT, () =>
      console.log(`Server is running on port ${environments.PORT}`)
    );
  }
}

export default App;
