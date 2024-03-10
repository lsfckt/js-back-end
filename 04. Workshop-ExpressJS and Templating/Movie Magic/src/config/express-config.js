const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

function expressConfig(app) {
    app.use(express.static(path.resolve('./src/static')));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
}

module.exports = expressConfig;