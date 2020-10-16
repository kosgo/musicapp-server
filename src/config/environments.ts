export default {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET as string,
  MDB_CONNECTION: process.env.MDB_CONNECTION as string,
};
