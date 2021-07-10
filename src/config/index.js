const { google } = require('googleapis');

const googleConnect = () => {
    const keyFile = 'src/credentials.json';
    const SCOPES = "https://www.googleapis.com/auth/spreadsheets";
    
    const auth = new google.auth.GoogleAuth({
        keyFile: keyFile,
        scopes: SCOPES,
    });

    const client = await auth.getClient();
    const spreadsheetId = "1S3VnEXOMvWVkY7ZCcesUyWrErwGMQaQCEVljVprvAoY";

    google.sheets({version: 'v4', auth: client, spreadsheetId: spreadsheetId});
}

module.exports = googleConnect;