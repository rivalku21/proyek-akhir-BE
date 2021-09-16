const controller_object = {};
const response = require("../utils/response");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require('../config/authSheet');

controller_object.login = async(req,res,next) => {
    const auth = config.auth;
    const googlesheets = config.googlesheets;
    const spreadsheetId = config.spreadsheetId;
    const { nim, password } = req.body;

    const getRows = await googlesheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet3!A2:C",
    });

    const nameRow = getRows.data.values.map(row => Object.assign({ 
        'name': row[0], 
        'nim': row[1], 
        'password': row[2],
    }));

    const dataNim =  nameRow.filter(it => it.nim === `${nim}`);
    if (dataNim.length = 1) {
        try {
            const user = dataNim[0];
            await bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    res.json({
                        statusCode:'401',
                        message: err
                    })
                } 
                if (isMatch) {
                    const nim = user.nim;
                    const name = user.name;

                    const token = jwt.sign({
                        nim: nim,
                        name: name,
                    },
                    // expired key
                    process.env.TOKEN_SECRET, {
                        expiresIn:'30m'
                    });

                    return res.status(200).json({
                        statusCode: '200',
                        name,
                        token,
                    });
                }
                else {
                    res.json({
                        statusCode:'401',
                        message: "Unauthorized"
                    })
                } 
            })
        } catch {
            res.json({
                statusCode:'401',
                message: "Unauthorized"
            })
        }
    }

    // pool.query(`SELECT * FROM public.user_table WHERE nik = $1`, [nik], (err, result) => {
    //     if (err) {
    //         response.responseFailed(res, 400, err);
    //     }
    //     if (!result.rows.length) {
    //         response.responseFailed(res, 401, "NIK or Password is incorrect!");
    //     }
    //     else {
    //         const user = result.rows[0];

    //         bcrypt.compare(password, user.password, (err, isMatch) => {
    //             if (err) {
    //                 response.responseFailed(res, 401, "NIK or Password is incorrect!")
    //             }
    //             if (isMatch) {
    //                 const id = result.rows[0].id;
    //                 const name = result.rows[0].name;
    //                 const role = result.rows[0].role;
                    
    //                 const token = jwt.sign({
    //                     nik: result.rows[0].nik,
    //                     role: role,
    //                     name: name,
    //                 },
    //                 // expired key
    //                 process.env.TOKEN_SECRET, {
    //                     expiresIn:'2d'
    //                 });

    //                 pool.query(`UPDATE public.user_table SET last_login = now() WHERE id = '${id}'`);
    //                     return res.status(200).json({
    //                         statusCode: 200,
    //                         id,
    //                         name,
    //                         role,
    //                         token,
    //                         user: result[0]
    //                     });
    //             }
    //             else {
    //                 response.responseFailed(res, 401, "NIK or Password is incorrect!");
    //             }
    //         });
    //     }
    // });
}

module.exports = controller_object;