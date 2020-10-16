import { Request, Response, Router } from 'express';
import validateRequestBody from '../middlewares/validate-request-body';
import { signInValidator, signUpValidator } from '../validators';
import { ResultDescriptor, ResultStatus } from '../models/result-descriptor.model';
import { authService } from '../services';

class AuthController {
  private readonly router: Router = Router();

  private handleSignUp = async (req: Request, res: Response): Promise<void> => {
    const result: ResultDescriptor = await authService.signUp(req.body);

    if (result.status === ResultStatus.SUCCESS) {
      res.send({ message: result.message });
      return;
    }

    res.status(400).send({ message: result.message });
  };

  private handleSignIn = async (req: Request, res: Response): Promise<void> => {
    const result = await authService.signIn(req.body);

    if (result.status === ResultStatus.SUCCESS) {
      res.header('Authorization', result.payload).send({ message: result.message });
      return;
    }
    if (result.status === ResultStatus.RESOURCE_NOT_FOUND) {
      res.status(404).send({ message: result.message });
      return;
    }

    res.status(400).send({ message: result.message });
  };

  public register(): Router {
    this.router.post('/sign-up', validateRequestBody(signUpValidator), this.handleSignUp);
    this.router.post('/sign-in', validateRequestBody(signInValidator), this.handleSignIn);

    return this.router;
  }
}

export default new AuthController();
