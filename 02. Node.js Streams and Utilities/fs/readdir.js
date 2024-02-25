const fs = require('fs/promises');

// fs.readdir('.', 'utf-8', (err, files) => {
//     if (err) {
//         return;
//     }

//     console.log('Files:');
//     files.forEach(file => {
//         console.log(file);
//     });
// });

fs.readdir('.', 'utf-8')
    .then(res => console.log(res));