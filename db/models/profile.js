'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING.BINARY,
    needsJob: DataTypes.BOOLEAN,
    offeringJob: DataTypes.BOOLEAN,
    score: DataTypes.INTEGER
  }, {});
  Profile.associate = function(models) {
    Profile.belongsTo(models.Question, { foreignKey: userId})
    Profile.belongsTo(models.Answer, { foreignKey: userId})
    Profile.belongsTo(models.QuestionVote, { foreignKey: userId})
    Profile.belongsTo(models.AnswerVote, { foreignKey: userId})
    Profile.belongsTo(models.CommentVote, { foreignKey: userId})
    Profile.belongsTo(models.Comment, { foreignKey: userId})

  };
  return Profile;
};
