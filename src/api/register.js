const controller_object = {};
const bcrypt = require('bcrypt');
const config = require('../config/authSheet');
const response = require("../utils/response");

controller_object.register = async(req,res,next) => {
    const auth = config.auth;
    const googlesheets = config.googlesheets;
    const spreadsheetId = config.spreadsheetId;

    const { name, nim, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

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

    if (dataNim.length > 0) {
        res.json({
            statusCode: 409,
            message: "Student's Number already registered"
        });
        // response.responseFailed(res, 409 , "NIM already registered");
    } 
    else {
        await googlesheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Sheet3!A:C",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [`${name}`,
                    `${nim}`,
                    `${hashedPassword}`]
                ]
            }
        })

        res.json({
            statusCode: 201,
            message: "success"
        });
        res.end();
    }

    // jika field tidak sesuai
    // pool.query(`SELECT * FROM public.user_table WHERE nik = $1`, [nik], (err, results) => {
    //     if (err) {
    //         throw err
    //     }
    //     if (results.rows.length > 0) {
    //         response.responseFailed(res, 409 , "NIK already registered");
    //     }
    //     // username is available
    //     else {
            
    //         pool.query(`INSERT INTO public.user_table (id, nik, name, email, role, password) VALUES ($1, $2, $3, $4, $5, $6)`, [uuid.v4(), nik, name, email, role, hashedPassword], (err, results) => { 
    //             if (err) { 
    //                 throw err;
    //             } 
    //             res.status(201).json({
    //                 statusCode: 201,
    //                 status: "sukses"
    //             });
    //             res.end();
    //         })
    //     }
    // });
};

module.exports = controller_object;