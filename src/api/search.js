const controller_object = {};
const connection = require('../config/config');

controller_object.search = (req, res, next) => {
    const search = req.query.q;
    
    connection.query(`SELECT * FROM file_data WHERE author || lecture1 || lecture2 || nim || title || year LIKE '%${search}%'`, (err, result) => {
        if (err) throw err;
        if (!result) {
            res.status(404).json({
                statusCode: 404,
                msg: 'data not found'
            })
        } else {
            res.status(200).json({
                statusCode: 200,
                data: result
            })
        }
    })
};

module.exports = controller_object;