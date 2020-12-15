const { Certificate } = require('crypto');
const faker = require('faker');
const db = require('./models/index');
const internship = require('./models/internship');


function seedDB() {
    var data = {};
    for (let i = 0; i < 5; i++) {
        data = {
            faculty: "5fd78c0e0bccef3be8cc08ab",
            title: 'Web Development',
            skillsRequired: ['Node.js', "MongoDB", "Express.js", "React.js"],
            duration: Math.floor(Math.random() * 13),
            applyBy: new Date('2020-12-30T22:58:32.786Z'),
            numberOpenings: Math.floor(Math.random() * 3),
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque delectus tempore eos quibusdam, tenetur quas nihil asperiores molestiae ad sunt, dolore, minima blanditiis? Error unde sapiente, temporibus sit eius neque.",
            perks: 'Certificate',
            type: 'Internal'
        }
        db.InternshipDetails.create(data)
            .then((intenship) => console.log(internship))
            .catch(err => console.log(err))
    }
    data = {};
    // for (let i = 0; i < 7; i++) {
    //     data = {
    //         title: faker.lorem.words(3),
    //         content: faker.lorem.lines(3),
    //         image: faker.image.imageUrl(),
    //         author: "5fd78c0e0bccef3be8cc08ab",
    //         hashtags: faker.lorem.word(1)
    //     }
    //     db.Post.create(data)
    //         .then((intenship) => console.log(internship))
    //         .catch(err => console.log(err))
    // }
}
module.exports = seedDB;