import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
console.log(process.env.DB_HOST)

mongoose.Promise = Promise
mongoose.connect(
  process.env.DB_HOST,
  {
    dbName: 'aws-portal',
    promiseLibrary: Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  },
) 