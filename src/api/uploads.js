const controller_object = {};
const pdfToText = require('pdf-to-text');

controller_object.upload = async(req, res, next) => {
    if (!req.file) {
        return res.status(500).send({
            statusCode: 500, 
            msg: "file is not found" 
        });
    } else {
        const file = `./public/uploads/pdf/${req.file.filename}`;

        pdfToText.pdfToText(file, function(err, data) {
            if (err) throw(err);
            if (data == 0) {
                res.status(403).json({
                    statusCode: 403,
                    msg: "your data is null" 
                })
            } else {
                res.status(200).send({
                    path: req.file.filename, //path akan digunakan untuk memasukkan data ke database
                    data: data.replace(/\r\n/g, " ") //data akan dilempar menjadi inputan di /api/check
                })
            }
        });
    }
}


module.exports = controller_object;