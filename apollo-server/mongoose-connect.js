import mongoose from 'mongoose'

mongoose.Promise = Promise
mongoose.connect(
  'mongodb://localhost:27017',
  {
    dbName: 'aws-portal',
    promiseLibrary: Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  },
) 