const express = require('express');
const router = require('./router');
const mongoose = require('mongoose');

const expressConfig = require('./configs/expressConfig');
const hbsConfig = require('./configs/hbsConfig');

const app = express();
const port = 3000;
const dbPath = 'mongodb://localhost:27017';

expressConfig(app);
hbsConfig(app);

app.use(router);

mongoose.connect(dbPath)
    .then(() => {
        console.log('DB is connected');
        app.listen(port, () => console.log(`Server is listening on port http://localhost:3000...`));
    });
