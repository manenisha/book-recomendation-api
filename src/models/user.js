// src/models/user.js
const Sequelize = require('sequelize');
const sequelize = require('./index');
const bcrypt = require('bcrypt');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 0,
        }
    }
}, {
    defaultScope: {
        attributes: {
            exclude: ["password"]
        }
    }

});
// );


User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSaltSync(10, 'a');
    user.password = bcrypt.hashSync(user.password, salt);
});

// User.beforeUpdate(async (user, options) => {
//     const salt = await bcrypt.genSaltSync(10, 'a');
//     user.password = bcrypt.hashSync(user.password, salt);
// });
module.exports = User;