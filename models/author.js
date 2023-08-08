const {Model, DataTypes} = require('sequelize');

const sequelize = require('../config/connection');


class Author extends Model {

}

Author.init({
id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
},
authorname: {
    type: DataTypes.STRING,
    allowNull: false
},
password: {
    type: DataTypes.STRING,
    allowNull: false
},
email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true
    }
}
},
{
    sequelize,
    // timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'author'
});

module.exports = Author;