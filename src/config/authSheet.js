const { google } = require('googleapis');
const keyFile = 'src/credentials.json';
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

const auth = new google.auth.GoogleAuth({
    keyFile: keyFile,
    scopes: SCOPES,
});

const client = auth.getClient();
const spreadsheetId = "1S3VnEXOMvWVkY7ZCcesUyWrErwGMQaQCEVljVprvAoY";

const googlesheets = google.sheets({version: 'v4', auth: client});

module.exports = {
    auth,
    googlesheets,
    spreadsheetId,
};