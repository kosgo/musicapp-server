import express, { Express } from 'express';
import cors from 'cors';

import { environments } from './config';

class App {
  private readonly app: Express;

  constructor() {
    this.app = express();
  }

  private setGlobalMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  public run(): void {
    this.setGlobalMiddlewares();

    this.app.listen(environments.PORT, () =>
      console.log(`Server is running on port ${environments.PORT}`)
    );
  }
}

export default App;
