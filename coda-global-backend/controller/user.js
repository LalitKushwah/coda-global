const userService = require('../service/user');

module.exports.login = async (req, res) => {
    const userLoginId = req.body.userId;
    const userPassword = req.body.password;
    if (!userLoginId || !userPassword) {
        return res.status(400).send({ status: 400, message: 'All fields are mandatory' });
    }
    const response = await userService.login(userLoginId, userPassword);
    console.log(response);
    res.status(response.status).send(response);
}
