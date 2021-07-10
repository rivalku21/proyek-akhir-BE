const controller_object = {};
const connection = require('../config/config');
const { google } = require('googleapis');

controller_object.contoh_fungsi = async(req, res, next) => {
    const keyFile = 'src/credentials.json';
    const SCOPES = "https://www.googleapis.com/auth/spreadsheets";
    
    const auth = new google.auth.GoogleAuth({
        keyFile: keyFile,
        scopes: SCOPES,
    });

    const client = await auth.getClient();

    const googlesheets = google.sheets({version: 'v4', auth: client});

    const spreadsheetId = "1S3VnEXOMvWVkY7ZCcesUyWrErwGMQaQCEVljVprvAoY";

    const getRows = await googlesheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    })
    
    res.status(200).json({
        data: getRows.data,
    })
};

module.exports = controller_object;