const controller_object = {};
// const connection = require('../config/config');
const config = require('../config/authSheet');

controller_object.search = async (req, res, next) => {
    const search = req.query.q.toLowerCase();

    const auth = config.auth;
    const googlesheets = config.googlesheets;
    const spreadsheetId = config.spreadsheetId;

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

    // console.log(nameRow.search("6705"));

    var results = [];

    for(var i=0; i<nameRow.length; i++) {
        for(key in nameRow[i]) {
            if(nameRow[i][key].toLowerCase().indexOf(search)!=-1) {
                results.push(nameRow[i]);
            }
        }
    }

    // console.log(results);

    // const data =  nameRow.data.filter((it) => {
    //     return it.title === `${search}` || it.author === `${search}` || it.nim === `${search}` || it.lecture1 === `${search}` || it.lecture2 === `${search}` || it.year === `${search}`
    // });
    
    // connection.query(`SELECT * FROM file_data WHERE author || lecture1 || lecture2 || nim || title || year LIKE '%${search}%'`, (err, result) => {
    //     if (err) throw err;
    //     if (!result) {
    //         res.status(404).json({
    //             statusCode: 404,
    //             msg: 'data not found'
    //         })
    //     } else {
    //         res.status(200).json({
    //             statusCode: 200,
    //             data: result
    //         })
    //     }
    // })

    res.status(200).json({
        statusCode: 200,
        data: results
    })
};

module.exports = controller_object;