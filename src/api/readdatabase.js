const controller_object = {};
const connection = require('../config/config');
const { google } = require('googleapis');

controller_object.readData = async(req, res, next) => {
    connection.query('SELECT * FROM file_data ORDER BY id desc', function (err, rows) {
        if (err) {
            throw err;
        }
        else {
            res.status(200).json({
                statusCode: 200,
                data: rows
            });
        }
    });
    // const keyFile = 'src/credentials.json';
    // const SCOPES = "https://www.googleapis.com/auth/spreadsheets";
    
    // const auth = new google.auth.GoogleAuth({
    //     keyFile: keyFile,
    //     scopes: SCOPES,
    // });
    // const client = await auth.getClient();
    // const googlesheets = google.sheets({version: 'v4', auth: client});
    // const spreadsheetId = "1S3VnEXOMvWVkY7ZCcesUyWrErwGMQaQCEVljVprvAoY";
    // const getRows = await googlesheets.spreadsheets.values.get({
    //     auth,
    //     spreadsheetId,
    //     range: "Sheet1!A2:z1000",
    // })
    
    // res.status(200).json({
    //     data: getRows.data.values,
    // })
};

controller_object.readDataById = async(req, res, next) => {
    const id = req.params.id;
    connection.query(`SELECT * FROM file_data data WHERE id = ${id}`, function (err, rows) {
        if (err) {
            throw err;
        } else {
            res.send({
                statusCode: 200,
                data: rows
            })
        }
    })
    // const keyFile = 'src/credentials.json';
    // const SCOPES = "https://www.googleapis.com/auth/spreadsheets";
    
    // const auth = new google.auth.GoogleAuth({
    //     keyFile: keyFile,
    //     scopes: SCOPES,
    // });
    // const client = await auth.getClient();
    // const googlesheets = google.sheets({version: 'v4', auth: client});
    // const spreadsheetId = "1S3VnEXOMvWVkY7ZCcesUyWrErwGMQaQCEVljVprvAoY";
    
    // const getRows = await googlesheets.spreadsheets.values.get({
    //     auth,
    //     spreadsheetId,
    //     range: "Sheet1",
    // });
    
    // res.status(200).json({
    //     data: getRows.data.values,
    // })
}

module.exports = controller_object;