const controller_object = {};
const fs = require('fs');
const pdfParser = require('pdf2json')

controller_object.contoh_fungsi = async(req, res, next) => {
    res.status(200).json({
        status: "sukses"
    });
};

module.exports = controller_object;