const controller_object = {};
const connection = require('../config/config');
const mv = require('mv');
const fileUtils = require('../utils/fileutils');

controller_object.createDatabase = (req, res, next) => {
    const { title, author, nim, lecture1, lecture2, year, filename} = req.body;

    var oldpath = `./public/uploads/pdf/${filename}`;
    var newpath = `./public/uploads/data/${filename}`;

    const path ='http://' + req.hostname + `:3001/public/uploads/data/${filename}`;

    var form_data = {
        title: title,
        author: author,
        nim: nim,
        lecture1: lecture1,
        lecture2: lecture2,
        year: year,
        file: path
    }

    connection.query('INSERT INTO file_data SET ?', form_data, function(err, result) {
        if (err) {
            throw err;
        } else {
            mv(oldpath, newpath, function(err) {
                if (err) throw err;
                else {
                    console.log("file moved");
                }
            });

            res.send({
                statusCode: 201,
                message: "Successfull save"
            })
        }
    });
};

controller_object.lectureList = (req, res, next) => {
    connection.query(`SELECT * FROM lecture ORDER BY name ASC`, function (err, rows) {
        if (err) {
            throw err;
        } else {
            res.status(200).json({
                statusCode: 200,
                data: rows
            });
        }
    })
}

controller_object.download = (req, res, next) => {
    const filename = req.params.filename
    const fileData = fileUtils.getPublicIp()
    const filePath = `${fileData}/${__dirname}/uploads/data/`;
    const path = filePath + filename;

    console.log(path);
}

module.exports = controller_object;