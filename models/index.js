const Blog = require('./Blog');
const Author = require('./author');

Author.hasMany(Blog, {
    foreignKey: 'authorId',
    onDelete: 'CASCADE',
});

Blog.belongsTo(Author, {
    foreignKey: 'authorId',
});

module.exports = { Author, Blog };