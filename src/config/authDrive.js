const { google } = require('googleapis');
const keyFile = 'src/credentials.json';
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
    keyFile: keyFile,
    scopes: SCOPES,
});

const driveId = "1DnVPAz-59VC9pviUboLIgF7daDZh87K6";

const driveService = google.drive({version: 'v3', auth});

module.exports = {
    auth,
    driveService,
    driveId,
};