const jwt = require('jsonwebtoken');

exports.authenticate = async function (req, res, next) {
    const token = req.headers.authorization;

    try {
        if (!token) {
            return res.status(401).send("Unauthorized");
        }

        jwt.verify(token, process.env.TOKEN);
        next();
    } catch (error) {
        res.status(500).json(error);
    }
};
