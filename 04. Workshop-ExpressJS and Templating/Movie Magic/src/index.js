const express = require('express');
const mongoose = require('mongoose');

const hbsConfig = require('./config/hbs-config');
const expressConfig = require('./config/express-config');
const router = require('./routes');

const app = express();
const port = 3000;

hbsConfig(app);
expressConfig(app);

app.use(router);

mongoose.connect('mongodb://127.0.0.1:27017/movie')
    .then(() => {
        console.log('DB Connected');
        
        app.listen(port, () => console.log(`Server running on port ${port}...`));
    });

