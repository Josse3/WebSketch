const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    database: 'WebSketch',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 5432
});

const jsonParser = bodyParser.json();

router.get('/checkusername', (ereq, eres) => {
    pool.query('SELECT name FROM users', (err, pres) => {
        if (err) console.log(err);
        eres.send({ available: pres.rows.findIndex(nameObj => nameObj.name === ereq.query.name) === -1 });
    });
});

router.post('/register', jsonParser, (req, eres) => {
    bcrypt.hash(req.query.pass, 3, (berr, hash) => {
        if (berr) console.log(berr);
        pool.query(`INSERT INTO users (name, password) VALUES ('${req.query.name}', '${hash}')`, (perr, pres) => {
            if (perr) console.log(perr);
            eres.send({ success: !berr && !perr ? true : false });
        });
    });
});

module.exports = router;