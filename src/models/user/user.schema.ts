import { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true, maxlength: 255 },
  firstName: { type: String, required: true, minlength: 2, maxlength: 255 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 255 },
  password: { type: String, required: true, minlength: 7, maxlength: 255 },
});

export default UserSchema;
