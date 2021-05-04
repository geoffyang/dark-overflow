'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: DataTypes.TEXT,
    score: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo (models.Profile, {foreignKey: userId})
    Comment.hasMany (models.CommentVote, {foreignKey: commentId})
    Comment.belongsTo (models.Answer, {foreignKey: answerId})     
  };
  return Comment;
};