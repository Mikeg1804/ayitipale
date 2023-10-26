const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class ObsceneBlog extends Model {
}

ObsceneBlog.init(
  {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
    blogsId: {
        type: DataTypes.UUID,
        references: {
            model: 'blogs',
            key: 'id'
        },
    },    
    markedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'obscene_blog',
    // timestamps: false,
  }
);

module.exports = ObsceneBlog;
