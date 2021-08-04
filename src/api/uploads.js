const controller_object = {};
// const pdfToText = require('pdf-to-text');
const pdfParser = require('pdf2json');

controller_object.upload = async(req, res, next) => {
    try {
        if (!req.file) {
            return res.status(500).send({
                statusCode: 500, 
                msg: "file is not found" 
            });
        } else {
            const file = `./public/uploads/pdf/${req.file.filename}`;

            // pdfToText.pdfToText(file, function(err, data) {
            //     if (err) throw(err);
            //     if (data == 0) {
            //         res.status(403).json({
            //             statusCode: 403,S
            //             msg: "your data is null" 
            //         })
            //     } else {
            //         res.status(200).send({
            //             path: req.file.filename, //path akan digunakan untuk memasukkan data ke database
            //             data: data.replace(/\r\n/g, " ") //data akan dilempar menjadi inputan di /api/check
            //         })
            //     }
            // });

            let PDFParser = new pdfParser(this,1);

            PDFParser.loadPDF(file);
            PDFParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
            PDFParser.on("pdfParser_dataReady", pdfData => {
                const raw = PDFParser.getRawTextContent().replace(/\r\n/g, " ");
                res.status(200).json({
                    path: req.file.filename, //path akan digunakan untuk memasukkan data ke database
                    data: raw //data akan dilempar menjadi inputan di /api/check
                })
            });
        }
    } catch (err) {
        res.status(403).send({
            statusCode: 403, 
            msg: err
        })
    }
}


module.exports = controller_object;