const { error } = require('console');
const fs = require('fs');

// SYNC
// console.log(1);
// const text = fs.readFileSync('./data.txt', { encoding: 'utf-8' });
// console.log(2);
// console.log(text);
// console.log(3);

// ASYNC

// console.log(1);
// fs.readFile('./data.txt', 'utf-8', (err, text) => {
//     if (err) {
//         console.log('Problem');
//         return;
//     }
//     console.log(2);
//     console.log(text);
// });

// console.log(3);

// ASYNC Promises
const util = require('util');

const pr = util.promisify(fs.readFile);

// then/catch

// pr('./data.txt', { encoding: 'utf-8' })
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => {
//         console.log('err');
//     });

// async/await

async function test() {

    try {
        const data = await pr('./data.txt', { encoding: 'utf-8' });
        console.log(data);
    } catch (err) {
        console.log(err);
    }

}

test();
