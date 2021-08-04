const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/uploads/pdf");
    },
    filename: function (req, file, cb) {
        let customFileName = crypto.randomBytes(18).toString("hex");
        let fileExtension = path.extname(file.originalname).split(".")[1];
        cb(null, customFileName + "." + fileExtension);
    },
});

const file_name = storage.filename;

const multerUtil = multer({ storage });

const deleteFile = (file) => {
    const filePath = path.resolve(process.cwd(), `public/uploads/pdf/${file}`);
    try {
        fs.unlinkSync(filePath);
    } catch (err) {
        console.log(`Error when delete file err : ${filePath}`);
    }
};

const getPublicIp = () => {
    if (process.env.NODE_ENV == "production") {
        return `127.0.0.1:${process.env.DB_PORT}`;
    }
    return `127.0.0.1:${process.env.DB_PORT}`;
};

const get_data = (sheet, tableName) => {
    var data = { success: false, data: [] };
    var resultData = get_object_data(sheet);
  
    if (resultData.length > 0) {
      data = {
        success: true,
        data: resultData
      };
    }
  
    var result = JSON.stringify(data);
    return ContentService.createTextOutput(result).setMimeType(
      ContentService.MimeType.JSON
    );
  }

module.exports = {
    multer: multerUtil,
    file_name,
    deleteFile,
    getPublicIp,
    get_data,
};