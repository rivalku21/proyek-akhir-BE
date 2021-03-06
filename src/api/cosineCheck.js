const controller_object = {};
const fs = require('fs-extra');
const PDFparser = require('pdf2json');
const files = fs.readdirSync("./public/uploads/data");
const docSimilarity = require('../utils/index');

controller_object.cosineCheck = async(req, res, next) => {
    const filename = req.body.filename;
    const a = `${req.body.file}`;

    try {
        // proses merubah pdf ke dalam bentuk raw
        let data = await Promise.all(files.map(async(file) => {
            let pdfParser = new PDFparser(this, 1);
            pdfParser.loadPDF(`./public/uploads/data/${file}`);
            let patient = await new Promise(async(resolve, reject) => {
                pdfParser.on("pdfParser_dataReady", (pdfData) => {
                    const raw = pdfParser.getRawTextContent().toLowerCase().replace(/\r\n/g, "").replace(/[^a-z0-9 ]/g," ");
                    resolve (raw);
                });
            });
            return patient;
        }));
        // akhir proses merubah pdf ke dalam bentuk raw

        // pencuplikan kata
        var b = `${data}`;
        const doc = docSimilarity.documentTokenizer([a, b]).wordInDocumentOccurence;
        
        const docWord = (input) => {
            const docSimi= [];
            const objek = Object.entries(input);
            const arrayFormat = objek.map(entry => Object.assign({'word': entry[0], 'point': entry[1]}));
            arrayFormat.forEach(function (items) {
                if (items.point > 1 && items.word.length > 3) {
                    docSimi.push(items.word);
                }               
            })
            return docSimi;
        }

        const wordDoc = docWord(doc);
        // akhir pencuplikan kata

        
        let percentase = [];

        // SKEMA 2
        for (let k in data) {
            const penghitungan = ((docSimilarity.wordFrequencySim(a, data[k], docSimilarity.cosineSim)) * 100 ).toFixed(2);
            const angka = Number(`${penghitungan}`);
            percentase.push(angka);
        }

        
        // SKEMA 1
        const result = ((docSimilarity.wordFrequencySim(a, b, docSimilarity.cosineSim)) * 100 ).toFixed(2);
        percentase.push(Number(result));

        const urutdata = percentase.sort((a, b) => {  
            return b - a
        });

        const hasil = urutdata[0];

        console.log(urutdata);
        

        // fiksasi nilai apa bila ada toleransi
        // const fixed = () => {
        //     if (result < 0) {
        //         return 0.1;
        //     } else {
        //         return result;
        //     }


        if (hasil <= 50) {
            res.status(200).send({
                filename: filename,
                result : hasil,
                doc: wordDoc,
            })
        } else {
            fs.unlinkSync(`./public/uploads/pdf/${filename}`);
            res.status(200).send({
                filename: filename,
                result : hasil,
                doc: wordDoc,
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({
            statusCode: '500',
            error: err
        })
    }
};

module.exports = controller_object;