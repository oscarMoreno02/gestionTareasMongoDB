const bcrypt = require('bcrypt');
const { faker, fakerES } = require('@faker-js/faker');

const userFactory = async (ctos = 1) => {

    let factory = []
    for(let i = 1; i <= ctos; i++) {
        const password = await bcrypt.hash('1234', 10);
        let u = 
            {
            first_name: fakerES.person.firstName(),
            last_name: fakerES.person.lastName(),
            email: fakerES.internet.email(),
            password: password,
            createdAt: new Date(),
            updatedAt: new Date()
            }
            factory.push(u)
    }
    return Promise.all(factory);
}

module.exports = {
    userFactory
}
