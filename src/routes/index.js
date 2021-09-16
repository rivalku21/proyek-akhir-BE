const express = require('express');
const router = express.Router();
const fileUtils = require('../utils/fileutils');
const dotenv = require('dotenv');

const api = require('../api/api');
const data = require('../api/readdatabase');
const uploads = require('../api/uploads');
const cosineSim = require('../api/cosineCheck');
const database = require('../api/database');
const search = require('../api/search');
const login = require('../api/login');
const register = require('../api/register');
const userMiddleware = require('../middleware/users');

router.get('/', api.contoh_fungsi);
router.get('/data', userMiddleware.isLoggedIn, data.readData);
router.get('/data/:id', userMiddleware.isLoggedIn, data.readDataById);
router.post('/uploads', userMiddleware.isLoggedIn, fileUtils.multer.single('file'), uploads.upload);
router.post('/check', userMiddleware.isLoggedIn, cosineSim.cosineCheck);
router.post('/save', userMiddleware.isLoggedIn, database.createDatabase);
router.get('/search', userMiddleware.isLoggedIn, search.search);
router.get('/lecture', userMiddleware.isLoggedIn, database.lectureList);
router.get('/delete', database.deletefile);
router.post('/login', login.login);
router.post('/register',userMiddleware.validateRegister, register.register);

module.exports = router;