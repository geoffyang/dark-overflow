"use strict";
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      userName: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      hashedPassword: DataTypes.STRING.BINARY,
      needsJob: DataTypes.BOOLEAN,
      offeringJob: DataTypes.BOOLEAN,
      score: DataTypes.INTEGER,
    },
    {}
  );
  Profile.associate = function (models) {
    Profile.hasMany(models.Question, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      hooks: true,
    });
    Profile.hasMany(models.Answer, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      hooks: true,
    });
    Profile.hasMany(models.QuestionVote, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      hooks: true,
    });
    Profile.hasMany(models.AnswerVote, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      hooks: true,
    });
    Profile.hasMany(models.CommentVote, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      hooks: true,
    });
    Profile.hasMany(models.Comment, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      hooks: true,
    });
  };
  return Profile;
};
