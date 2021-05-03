'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentVote = sequelize.define('CommentVote', {
    voteSum: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {});
  CommentVote.associate = function(models) {
    // associations can be defined here
  };
  return CommentVote;
};