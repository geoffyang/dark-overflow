'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentVote = sequelize.define('CommentVote', {
    voteSum: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {});
  CommentVote.associate = function(models) {
    CommentVote.belongsTo (models.Profile, {foreignKey: userId})
    CommentVote.belongsTo (models.Comment, {foreignKey: commentId}) 
  };
  return CommentVote;
};