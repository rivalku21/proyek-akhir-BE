const express = require('express');
const router = express.Router();
const fileUtils = require('../utils/fileutils');

const api = require('../api/api');
const data = require('../api/readdatabase');
const uploads = require('../api/uploads');
const cosineSim = require('../api/cosineCheck');
const database = require('../api/database');
const search = require('../api/search');

router.get('/', api.contoh_fungsi);
router.get('/data', data.readData);
router.get('/data/:id', data.readDataById);
router.post('/uploads', fileUtils.multer.single('file'), uploads.upload);
router.post('/check', cosineSim.cosineCheck);
router.post('/save', database.createDatabase);
router.get('/search', search.search);
router.get('/lecture', database.lectureList);
router.get('delete', database.deletefile);

module.exports = router;