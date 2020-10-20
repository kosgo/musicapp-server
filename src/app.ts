import express, { Express } from 'express';
import cors from 'cors';
import { Mongoose } from 'mongoose';
import { Server } from 'http';

import { environments } from './config';
import { authController } from './controllers';
import verifyJwtToken from './middlewares/verify-jwt-token';
import connectDb from './db/connect-db';

class App {
  private readonly app: Express = express();
  private dbConnection: Mongoose | null = null;
  private server: Server | null = null;

  private setGlobalMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private setupControllers(): void {
    this.app.use('/auth', authController.register());
  }

  private setupProtectedControllers(): void {
    this.app.use(verifyJwtToken);
  }

  public async run(): Promise<void> {
    this.dbConnection = await connectDb();

    this.setGlobalMiddlewares();
    this.setupControllers();
    this.setupProtectedControllers();

    this.app.use('*', (_, res) => res.status(501).send({ message: 'Method not implemented' }));

    this.server = this.app.listen(environments.PORT, () =>
      console.log(`Server is running on port ${environments.PORT}`)
    );
  }

  public exit(): void {
    this.server?.close(() => {
      console.log('HTTP Server has been closed');

      this.dbConnection?.disconnect(() => {
        console.log('MongoDB connection has been closed');
        process.exit(0);
      });
    });
  }
}

export default App;
