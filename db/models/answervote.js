'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnswerVote = sequelize.define('AnswerVote', {
    voteSum: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {});
  AnswerVote.associate = function(models) {
    AnswerVote.belongsTo (models.Profile, {foreignKey: userId})
    AnswerVote.belongsTo (models.Answer, {foreignKey: answerId}) 
  };
  return AnswerVote;
};