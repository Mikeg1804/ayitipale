const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogComment extends Model {}

BlogComment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    blogId: {
      type: DataTypes.UUID, // Make sure this matches the type in your Blog model
      allowNull: false,
      references: {
        model: 'blogs', // Make sure this matches the table name for the Blog model
        key: 'id',
      },
    },
    commentId: {
      type: DataTypes.UUID, // Make sure this matches the type in your Comment model
      allowNull: false,
      references: {
        model: 'comment', // Make sure this matches the table name for the Comment model
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'blog_comment',
  }
);

module.exports = BlogComment;

