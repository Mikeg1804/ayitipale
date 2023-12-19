const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Author extends Model {}

Author.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    authorname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      index: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user", // Default role for regular users
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    // underscored: true,
    modelName: "author",
  }
);

module.exports = Author;
