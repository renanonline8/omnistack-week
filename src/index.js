require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_CONN, {
    useNewUrlParser: true,
});

/**
 * Stopped Aula 2 - 16:19
 */

app.get('/', (req, res) => {
    return res.send(`Olá ${req.query.name}`);
});

app.listen(3333);