const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');

class Likes extends Model {
}


Likes.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: true,
    },
    blogsId: {
      type: DataTypes.UUID,
      references: {
          model: 'blogs',
          key: 'id'
      },
  },  
    authorLikedId: {
      type: DataTypes.UUID,
        references: {
            model: 'author',
            key: 'id',
        }
    },
    isLiked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'like',
  }
);

module.exports = Likes;