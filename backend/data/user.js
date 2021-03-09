const bcrypt = require('bcryptjs');

const users = [
    {
        name : ' Admin User ',
        email: 'admin@example.com',
        password : bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name : ' Affan Dahar ',
        email: 'affan@example.com',
        password : bcrypt.hashSync('123456',10),
    },
    {
        name : ' Affy Dahar ',
        email: 'affy@example.com',
        password : bcrypt.hashSync('123456',10),

    }
]


module.exports = users