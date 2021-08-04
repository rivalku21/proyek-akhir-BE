const controller_object = {};
// const connection = require('../config/config');
const config = require('../config/authSheet');

const auth = config.auth;
const googlesheets = config.googlesheets;
const spreadsheetId = config.spreadsheetId;

controller_object.readData = async(req, res, next) => {
    // connection.query('SELECT * FROM file_data ORDER BY id desc', function (err, rows) {
    //     if (err) {
    //         throw err;
    //     }
    //     else {
    //         res.status(200).json({
    //             statusCode: 200,
    //             data: rows
    //         });
    //     }
    // });

    const getRows = await googlesheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1!A2:H",
    })

    const nameRow = getRows.data.values.map(row => Object.assign({ 
        'title': row[0], 
        'author': row[1], 
        'nim': row[2], 
        'lecture1': row[3], 
        'lecture2': row[4], 
        'year': row[5], 
        'path': row[6],
        'id': row[7]
    }));
    
    res.status(200).json({
        data: nameRow,
    })
};

controller_object.readDataById = async(req, res, next) => {
    const id = req.params.id;

    const getRows = await googlesheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1!A2:H",
    })

    const nameRow = getRows.data.values.map(row => Object.assign({ 
        'title': row[0], 
        'author': row[1], 
        'nim': row[2], 
        'lecture1': row[3], 
        'lecture2': row[4], 
        'year': row[5], 
        'path': row[6],
        'id': row[7]
    }));

    const dataById =  nameRow.filter(it => it.id === `${id}`);

    // connection.query(`SELECT * FROM file_data data WHERE id = ${id}`, function (err, rows) {
    //     if (err) {
    //         throw err;
    //     } else {
    //         res.send({
    //             statusCode: 200,
    //             data: rows
    //         })
    //     }
    // })
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
    //     range: `Sheet1!${id}:${id}`,
    // });
    
    res.status(200).json({
        data: dataById,
    })
}

module.exports = controller_object;