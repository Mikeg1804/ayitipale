const Blog = require("./Blog");
const Author = require("./Author/index.js");
const Comment = require("./Comment");
// const Likes = require("./Likes");
// const ObsceneBlog = require("./ObsceneBlog");
const BlogComment = require("./BlogComment");

Author.hasMany(Blog, {
  foreignKey: "authorId",
  onDelete: "CASCADE",
});

Blog.belongsTo(Author, {
  foreignKey: "authorId",
});

Blog.belongsToMany(Comment, { through: "blog_comment", foreignKey: "blogId" });
Comment.belongsToMany(Blog, {
  through: "blog_comment",
  foreignKey: "commentId",
});

Blog.hasMany(Comment, {
  foreignKey: "blogId",
  onDelete: "CASCADE",
});

Comment.belongsTo(Blog, {
  foreignKey: "blogId",
});

Author.hasMany(Comment, {
  foreignKey: "authorId",
  onDelete: "CASCADE",
});

Comment.belongsTo(Author, {
  foreignKey: "authorId",
});

// Author.hasMany(Likes, {
//   foreignKey: "authorLikedId",
//   onDelete: "CASCADE",
// });

// Likes.belongsTo(Author, {
//   foreignKey: "authorLikedId",
// });

// Blog.hasMany(Likes, {
//   foreignKey: "likedBlogId",
//   onDelete: "CASCADE",
// });

// Likes.belongsTo(Blog, {
//   foreignKey: "likedBlogId",
// });

// Blog.hasMany(ObsceneBlog, {
//   foreignKey: "blogId",
//   onDelete: "CASCADE",
// });

// ObsceneBlog.belongsTo(Blog, {
//   foreignKey: "blogId",
// });

module.exports = { Author, Blog, Comment, BlogComment };
