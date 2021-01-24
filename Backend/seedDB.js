// const { Certificate } = require('crypto');
// const faker = require('faker');
const db = require('./models/index');


async function seedDB() {

    // data={
    //     name:'python',
    //     posts:['6005c3f662b5b0146419f686','6006d73dafda610c66141c40','60077ab8bfba5727e046fa62']
    // }
    // db.Hashtag.create(data)
    // .then((internship) => console.log(internship))
    //         .catch(err => console.log(err))
    // for (let i = 0; i < 3; i++) {
    //     data = {
    //         faculty: "5fd78c0e0bccef3be8cc08ab",
    //         title: 'Machine Learning',
    //         skillsRequired: ['Python', 'R', 'Pandas'],
    //         duration: Math.floor(Math.random() * 13),
    //         applyBy: new Date('2021-12-30T22:58:32.786Z'),
    //         numberOpenings: Math.floor(Math.random() * 3),
    //         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque delectus tempore eos quibusdam, tenetur quas nihil asperiores molestiae ad sunt, dolore, minima blanditiis? Error unde sapiente, temporibus sit eius neque.",
    //         perks: 'Certificate',
    //         type: 'External'
    //     }
    //     db.InternshipDetails.create(data)
    //         .then((internship) => console.log(internship))
    //         .catch(err => console.log(err))
    // }
    data = {
        facultyEmails: ['vedant.nagani@somaiya.edu', 'huzaifa.k@somaiya.edu'],
        councilEmails: ['dhruva.b@somaiya.edu'],
        alumniEmails: []
    }
    db.HiddenData.create(data)
        .then((result) => {
            console.log(Added)
        }).catch((err) => {
            console.log(err);
        });


}

module.exports = seedDB;