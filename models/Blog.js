const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {

}

Blog.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
    title: { type: DataTypes.STRING, 
        allowNull: false
     },
    content: { type: DataTypes.TEXT, 
        allowNull: false 
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    authorId: { 
        type: DataTypes.UUID,
        references: {
            model: 'author',
            key: 'id'
        },
    },
    commentId: { 
      type: DataTypes.UUID,
      references: {
          model: 'comment',
          key: 'id'
      },
  },

    category: {
        type: DataTypes.ENUM('Teknoloji', 'Nati', 'Agrikilti', 'Komedi' ,'kontantman', 'biznis', 'ekonomi', 'lot'), // Add your categories here
        allowNull: false
      },
    totalLikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
}, 
{
    sequelize,
    // timestamps: true,
    freezeTableName: true,
    // underscored: true,
    modelName: 'blogs'
}
);

module.exports = Blog;