const fs = require('fs');

fs.writeFile('./created.txt', 'My first created file with fs.writeFile', { encoding: 'utf-8', flag: 'a' }, (err) => {
    if (err) {
        return console.log('ERROR');
    }

    console.log('File is created!');
})