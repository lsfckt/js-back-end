const fs = require('fs');

function render(firstView, secondView, { ...arr }, callback) {
    fs.readFile({ firstView, secondView }, 'utf-8', (err, result) => {
        if (err) {
            return callback(err);
        }

        const { firstArr, secondArr } = { ...arr };

        const firstResult = firstArr.map(data => {
            return Object.keys(data).reduce((acc, key) => {

                const pattern = new RegExp(`{{${key}}}`, 'g');

                return acc.replace(pattern, data[key]);
            }, result);
        }).join('\n');

        const secondResult = secondArr.map(data => {
            return Object.keys(data).reduce((acc, key) => {

                const pattern = new RegExp(`{{${key}}}`, 'g');

                return acc.replace(pattern, data[key]);
            }, result);
        }).join('\n');

        callback(null, { firstResult, secondResult });
    });
}

module.exports = render;