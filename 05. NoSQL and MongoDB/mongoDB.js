const { MongoClient } = require('mongodb');

const connectionStr = 'mongodb://localhost:27017';
const client = new MongoClient(connectionStr);

async function run() {
    const db = client.db('test1');
    const collection = db.collection('people');

    const people = await collection.find({ name: 'Ivan' }).toArray();

    console.log(people);
}

run();
