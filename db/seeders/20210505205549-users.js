"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */ return queryInterface.bulkInsert(
      "Profiles",
      [
        {
          id: 100,
          userName: "demo",
          firstName: "Billy",
          lastName: "Griggs",
          email: "billy@gmail.com",
          hashedPassword:
            "$2a$10$uXnTSaUmqu6OsmAlIMPgc.az8sXq2iX0ubs.6CUo3rQqtWLMplFyW",
          needsJob: "false",
          offeringJob: "false",
          score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 200,
          userName: "grug",
          firstName: "Grug",
          lastName: "Stevens",
          email: "grug@grug.com",
          hashedPassword:
            "$2a$10$uXnTSaUmqu6OsmAlIMPgc.az8sXq2iX0ubs.6CUo3rQqtWLMplFyW",
          needsJob: "false",
          offeringJob: "false",
          score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */ return queryInterface.bulkDelete(
      "Profiles",
      null,
      {}
    );
  },
};
