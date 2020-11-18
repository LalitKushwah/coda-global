const express = require('express');
const app = express();
const cors = require('cors')

const userRouter = require('./route/user');

app.use(cors());

app.use(express.json());

app.use('/api/user', userRouter);

app.listen(3000, () => {
    console.log('Server has been started on: 3000');
});