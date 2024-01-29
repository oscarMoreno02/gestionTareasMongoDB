const bcrypt = require('bcrypt');
const { faker, fakerES } = require('@faker-js/faker');

const userFactory = async (ctos = 2) => {
    
    let factory = []
    let names=['root','user']
    for(let i = 0; i < ctos; i++) {
        const password = await bcrypt.hash('1234', 10);
        let u = 
            {
            first_name: names[i],
            last_name: names[i],
            email: names[i]+'@'+names[i]+'.com',
            password: 'password',
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
