'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
    score: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  Question.associate = function(models) {
    Question.belongsTo (models.Profile, {foreignKey: 'userId'})
    Question.belongsTo (models.Category, {foreignKey: 'categoryId'})
    Question.hasMany (models.QuestionVote, {foreignKey: 'questionId'})    
  };
  return Question;
};