const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const cors = require('cors');
const path = require('path');
require('dotenv').config()

// to run locally

// const PORT = 3000;
// const app = express();
// app.use(bodyParser.json());
// app.use(cors());
// app.use('/api', api);

// to run in prod env

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', api);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(PORT, () => {
    console.log('Server running on localhost:' + PORT);
});


