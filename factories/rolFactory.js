const bcrypt = require('bcrypt');
const {
    faker,
    fakerES
} = require('@faker-js/faker');

const rolFactory = async (ctos = 1) => {
    let factory = [
        admin = {
            description: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        regular = {
            description: 'programmer',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]
    return Promise.all(factory);
}

module.exports = {
    rolFactory
}