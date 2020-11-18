const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');

const userRouter = require('./route/user');
const restaurantRouter = require('./route/restaurant')
const orderRouter = require('./route/order')

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// parse application/json

app.use('/api/user', userRouter);
app.use('/api/restaurants', restaurantRouter)
app.use('/api/orders', orderRouter)

app.listen(3000, () => {
    console.log('Server has been started on: 3000');
});