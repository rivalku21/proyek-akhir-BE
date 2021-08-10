const express = require('express');
// const {google} = require ('googleapis');
const cors = require('cors');
// const { pool } = require('./config/config');
const routes_api = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json( {limit: '50mb', extended: true} ));
app.use(express.static('public'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
    next();
});

app.use('/', routes_api);

app.listen(PORT, () => {
    console.log(`listening at ${PORT}`);
})
