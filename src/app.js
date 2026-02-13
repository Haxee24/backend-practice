import express from 'express';

const app = express();

app.use(express.json());

//routes import
import userRouter from './routes/user.route.js';
import tweetRouter from './routes/tweet.route.js'

//routes declaration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tweets', tweetRouter);

export default app;