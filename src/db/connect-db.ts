import mongoose, { Mongoose } from 'mongoose';
import { environments } from '../config';



async function connectDb(): Promise<Mongoose> {
  return mongoose.connect(
    environments.MDB_CONNECTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) throw error;

      console.log('Connected DB');
    }
  );
}

export default connectDb;
