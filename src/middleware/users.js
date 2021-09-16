const jwt = require('jsonwebtoken');
const response = require('../utils/response');

module.exports = {
    validateRegister: (req, res, next) => {
        const { name, nim, password, password2 } = req.body;
        // username any null data
        if (!name || !nim || !password || !password2 ) {
            res.json({
                statusCode:'422',
                message: "Please enter all fields"
            });
            return;
            // response.responseFailed(res, 422 , "Please enter all fields");
        }
        // password min 8 chars
        if (password.length < 8) {
            res.json({
                statusCode:'422',
                message: "Password should be at least 8 characters"
            });
            return;
            // response.responseFailed(res, 422 , "Password should be at least 8 characters");
        }
        // password (repeat) does not match
        if (password != password2) {
            res.json({
                statusCode:'422',
                message: "Password do not match"
            });
            return;
            // response.responseFailed(res, 422 , "Password do not match");
        }

        next();
    },

    // middleware/users.js

    isLoggedIn: (req, res, next) => {
        try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(
            token,
            process.env.TOKEN_SECRET
        );
        req.userData = decoded;
        next();
        } catch (err) {
        return res.status(401).send({
            msg: 'Your session is not valid!'
        });
        }
    }
};