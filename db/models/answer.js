"use strict";
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    "Answer",
    {
      text: DataTypes.TEXT,
      score: DataTypes.INTEGER,
      questionId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Answer.associate = function (models) {
    Answer.belongsTo(models.Profile, { foreignKey: "userId" });
    Answer.belongsTo(models.Answer, { foreignKey: "questionId" });
    Answer.hasMany(models.AnswerVote, {
      foreignKey: "answerId",
      onDelete: "CASCADE",
      hooks: true,
    });
    Answer.hasMany(models.Comment, {
      foreignKey: "answerId",
      onDelete: "CASCADE",
      hooks: true,
    });
  };
  return Answer;
};
