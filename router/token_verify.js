const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(404).json("Acsee Denied please log in ");

    try {
        const verifyed = jwt.verify(token, process.env.TOKEN)
        req.user = verifyed._id;

        next();

    } catch {
        res.status(404).json("Invalid Token");
    }


}