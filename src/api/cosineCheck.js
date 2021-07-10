const controller_object = {};
const fs = require('fs');
const PDFparser = require('pdf2json');
const files = fs.readdirSync("./public/uploads/data");
const docSimilarity = require('../utils/index');

controller_object.cosineCheck = async(req, res, next) => {
    const filename = req.body.filename;
    const a = `${req.body.file}`;

    try {
        let data = await Promise.all(files.map(async(file) => {
            let pdfParser = new PDFparser(this, 1);
            pdfParser.loadPDF(`./public/uploads/data/${file}`);
            let patient = await new Promise(async(resolve, reject) => {
                pdfParser.on("pdfParser_dataReady", (pdfData) => {
                    const raw = pdfParser.getRawTextContent().replace(/\r\n/g, " ");
                    resolve (raw);
                });
            });
            return patient;
        }));

        var b = `${data}`;
        // const doc = docSimilarity.documentTokenizer([a, b]).bagOfWords;

        const result = ((docSimilarity.wordFrequencySim(a, b, docSimilarity.cosineSim)) * 100).toFixed(2);
        if (result <= 30) {
            res.status(200).send({
                filename: filename,
                result : result,
                // doc: doc
            })
        } else {
            fs.unlinkSync(`./public/uploads/pdf/${filename}`);
            res.status(200).send({
                filename: filename,
                result : result,
                // doc: doc
            })
        }

    } catch {
        res.status(500)
    }
};

module.exports = controller_object;