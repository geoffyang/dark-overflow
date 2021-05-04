'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuestionVote = sequelize.define('QuestionVote', {
    voteSum: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});
  QuestionVote.associate = function(models) {
    QuestionVote.belongsTo (models.Profile, {foreignKey: 'userId'})
    QuestionVote.belongsTo (models.Question, {foreignKey: 'questionId'}) 
  };
  return QuestionVote;
};