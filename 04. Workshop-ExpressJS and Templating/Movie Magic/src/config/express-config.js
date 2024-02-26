const express = require('express');
const path = require('path');

function expressConfig(app) {
    app.use(express.static(path.resolve('./src/public')));
    // app.use(express.static())
}

module.exports = expressConfig;