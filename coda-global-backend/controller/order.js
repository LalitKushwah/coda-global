const orderService = require('../service/order');

module.exports.getOrdersByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const responseObj = await orderService.getOrderByUserId(userId);
        console.log(responseObj)
        return res.status(responseObj.status).send(responseObj);
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error: error});
    }
}
module.exports.createOrder = async (req, res) => {
    const data = req.body;
    console.log('==== controller =====', data);
    try {
        const responseObj = await orderService.createOrder(data);
        console.log(responseObj)
        return res.status(responseObj.status).send(responseObj);
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error: error});
    }
}