const controller_object = {};
const mv = require('mv');
const fs = require('fs');
const uuid = require('uuid');

const authSheet = require('../config/authSheet');
const authDrive = require('../config/authDrive');

controller_object.createDatabase = async(req, res, next) => {
    const { title, author, nim, lecture1, lecture2, year, filename} = req.body;

    var oldpath = `./public/uploads/pdf/${filename}`;
    var newpath = `./public/uploads/data/${filename}`;

    const googlesheets = authSheet.googlesheets;
    const spreadsheetId = authSheet.spreadsheetId;
    const auth = authSheet.auth;

    const driveId = authDrive.driveId;
    const driveService = authDrive.driveService;

    try {

        // upload ke google drive
        const uploads = await driveService.files.create({
            resource: {
                'name': `${filename}`,
                'parents': [`${driveId}`],
            },
            media: {
                mimeType: 'application/pdf',
                body: fs.createReadStream( oldpath )
            },
            fields: 'id'
        })
        switch(uploads.status){
            case 200:
                console.log('File uploaded')
                break;
        }

        // menangkap id data di google drive
        const idData = uploads.data.id;
        const id = uuid.v4();

        // memasukkan link data
        const path = `https://drive.google.com/file/d/${idData}/view?usp=sharing`;

        // upload data ke sheet
        await googlesheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Sheet1!A:G",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [`${title}`,
                    `${author}`,
                    `${nim}`,
                    `${lecture1}`,
                    `${lecture2}`,
                    `${year}`,
                    `${path}`,
                    `${id}`]
                ]
            }
        })

        // Memindah data ke folder upload data
        mv(oldpath, newpath, function(err) {
            if (err) throw err;
            else {
                console.log("file moved");
            }
        });
        
        res.send({
            statusCode: 201,
            message: "Successfull save"
        })
    } catch (err) {
        throw err;
    }
};

controller_object.lectureList = async(req, res, next) => {

    const googlesheets = authSheet.googlesheets;
    const spreadsheetId = authSheet.spreadsheetId;
    const auth = authSheet.auth;

    const getRows = await googlesheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet2!A2:z1000",
    })
    
    res.status(200).json({
        data: getRows.data.values,
    })

}

controller_object.deletefile = (req, res, next) =>{
    const filename = req.body.filename;
    fs.unlinkSync(`./public/uploads/pdf/${filename}`);

    res.status(200).send({
        msg: "file deleted"
    })

}

module.exports = controller_object;