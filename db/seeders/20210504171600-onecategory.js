"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Algorithms & Sorts",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Ajax", createdAt: new Date(), updatedAt: new Date() },
        { name: "Async/Await", createdAt: new Date(), updatedAt: new Date() },
        { name: "Arrays", createdAt: new Date(), updatedAt: new Date() },

        { name: "Callbacks", createdAt: new Date(), updatedAt: new Date() },
        { name: "Classes", createdAt: new Date(), updatedAt: new Date() },
        { name: "Closures", createdAt: new Date(), updatedAt: new Date() },
        { name: "CSS", createdAt: new Date(), updatedAt: new Date() },
        { name: "Debugging", createdAt: new Date(), updatedAt: new Date() },
        { name: "Express", createdAt: new Date(), updatedAt: new Date() },
        { name: "HTTP", createdAt: new Date(), updatedAt: new Date() },
        { name: "Networking", createdAt: new Date(), updatedAt: new Date() },
        { name: "Node.js", createdAt: new Date(), updatedAt: new Date() },
        { name: "NPM", createdAt: new Date(), updatedAt: new Date() },
        { name: "Objects", createdAt: new Date(), updatedAt: new Date() },
        { name: "Promises", createdAt: new Date(), updatedAt: new Date() },
        { name: "Recursion", createdAt: new Date(), updatedAt: new Date() },
        { name: "Regex", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Scope & Hoisting",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Time Complexity",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Variables", createdAt: new Date(), updatedAt: new Date() },
        { name: "Other", createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
