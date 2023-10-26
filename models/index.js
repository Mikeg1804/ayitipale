const Blog = require('./Blog');
const Author = require('./Author');
const Comment = require('./Comment');
const Likes = require('./Likes');
const ObsceneBlog = require('./ObsceneBlog');

Author.hasMany(Blog, {
    foreignKey: 'authorId',
    onDelete: 'CASCADE',
});

Blog.belongsTo(Author, {
    foreignKey: 'authorId',
});


Blog.hasMany(Comment, {
    foreignKey: 'blogId',
    onDelete: 'CASCADE',
  });
  
Comment.belongsTo(Blog, {
    foreignKey: 'blogId', 
  });

  Author.hasMany(Comment, {
    foreignKey: 'authorCommentId',
    onDelete: 'CASCADE',
  });

  Comment.belongsTo(Author, {
    foreignKey: 'authorCommentId',
  }); 
  
  Author.hasMany(Likes, {
    foreignKey: 'authorLikedId',
    onDelete: 'CASCADE',
    });
  
  Likes.belongsTo(Author, {
    foreignKey: 'authorLikedId',
  });


  Blog.hasMany(Likes, {
    foreignKey: 'likedBlogId',
    onDelete: 'CASCADE',
  });
  
  Likes.belongsTo(Blog, {
    foreignKey: 'likedBlogId',
  });

  Blog.hasMany(ObsceneBlog, {
    foreignKey: 'blogId',
    onDelete: 'CASCADE',
  });
  
  ObsceneBlog.belongsTo(Blog, {
    foreignKey: 'blogId',
  });

module.exports = { Author, Blog, Comment,
    Likes, ObsceneBlog };