const express = require('express');
const { json } = require('express/lib/response');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
app.use(express(json))

const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

app.use('/resources', express.static('public'));
app.use('/resource', express.static(__dirname + '/public'));

const bcrypt = require('bcrypt');

const session = require('express-session');
app.use(session({

    secret: 'secret',
    resave: true,
    saveUninitialized: true

}))

const conexion = require('./database/db');

app.use('/', require('./router'))

app.listen(3000, () => {
    console.log('Server corriendo en http://localhost:3000')
})