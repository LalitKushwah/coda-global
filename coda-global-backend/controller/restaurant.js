const restaurantService = require('../service/restaurant');

module.exports.getRestaurantList = async (req, res) => {
    const searchTerm = req.query.searchTerm;
    try {
        const responseObj = await restaurantService.getRestaurantList(searchTerm);
        console.log(responseObj)
        return res.status(responseObj.status).send(responseObj);
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error: error});
    }
}