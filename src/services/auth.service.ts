import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserModel } from '../models/user';
import { ResultDescriptor, ResultStatus } from '../models/result-descriptor.model';
import { environments } from '../config';

class AuthService {
  public signUp = async ({
    email,
    password,
    firstName,
    lastName,
  }: User): Promise<ResultDescriptor> => {
    const user = await UserModel.findOne({ email });
    if (user) {
      return { message: `User ${email} already exists.`, status: ResultStatus.ERROR };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await new UserModel({
        email,
        firstName,
        lastName,
        password: hashedPassword,
      }).save();

      return { message: `User ${email} successfully registered.`, status: ResultStatus.SUCCESS };
    } catch (error) {
      console.error(error);

      return { message: `Error while creating a new user.`, status: ResultStatus.ERROR };
    }
  };

  public signIn = async ({ email, password }: User): Promise<ResultDescriptor<string>> => {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return { message: `User ${email} not found!`, status: ResultStatus.RESOURCE_NOT_FOUND };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return { message: 'Email or password is wrong', status: ResultStatus.ERROR };
    }

    const jwtToken = jwt.sign({ id: user._id }, environments.JWT_SECRET);

    return {
      message: 'Successfully signed in',
      payload: `Bearer ${jwtToken}`,
      status: ResultStatus.SUCCESS,
    };
  };
}

export default new AuthService();
