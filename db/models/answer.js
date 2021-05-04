'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    text: DataTypes.TEXT,
    score: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    Answer.hasMany (models.Profile, {foreignKey: userId})
    Answer.belongsTo (models.AnswerVote, {foreignKey: AnswerId})   
    Answer.hasMany (models.Comment, {foreignKey: answerId})
  };
  return Answer;
};