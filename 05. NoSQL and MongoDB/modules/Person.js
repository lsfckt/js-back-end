const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test1');
    console.log('Connected to test1 databes succsessfuly!');
}
main();

async function model() {

    const personSchema = new mongoose.Schema({

        firstName: String,
        lastName: {
            type: String,
            enum: {
                values: ['Kirilov', 'Liybenov', 'Zahariev'],
                message: '{VALUE} is not valid'
            }
        },
        age: {
            type: Number,
            min: [7, 'Age must be at least 7, got {VALUE}'],
            max: 49
        }

    });

    //Set method to personSchema

    // personSchema.methods.getInfo = function () {
    //     return `I am ${this.firstName} ${this.lastName}`;
    // }

    // Create virtual property

    // personSchema.virtual('concat').get(function () {
    //     return this.firstName + ' ' + this.lastName;
    // });

    // Create custom validation

    // personSchema.path('firstName')
    //     .validate(function () {
    //         return this.firstName.length >= 3
    //             && this.firstName.length <= 7;
    //     }, 'First name must be between 3 and 7 symbols long');

    // Create new Person class
    const Person = mongoose.model('Person', personSchema);

    // Create new person

    // const myPerson = new Person({
    //     firstName: 'Kiril',
    //     lastName: 'Kirilov',
    //     age: 28
    // });

    // await myPerson.save();

    // const data = await Person.find(this.people);
    // data.forEach(person => console.log(person.concat));

    const curPers = await Person.find({}).sort({ age: -1 }).limit(2);
    console.log(curPers);
    module.exports = mongoose.model('Person', personSchema);
}
model();