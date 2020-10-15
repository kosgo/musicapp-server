import { Request, Response, Router } from 'express';

class AuthController {
  private readonly router: Router = Router();

  private handleSignUp = (req: Request, res: Response): void => {
    console.log(req.body);
    res.send();
  }

  private handleSignIn = (req: Request, res: Response): void => {
    console.log(req.body);
    res.send();
  }

  public register(): Router {
    this.router.post('/sign-up', this.handleSignUp);
    this.router.post('/sign-in', this.handleSignIn);

    return this.router;
  }
}

export default new AuthController();
