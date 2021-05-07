'use strict';

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
      "Questions",
      [
        {
          title: "What is a database fact table?",
          text: "For that matter, what is a dimension table?",
          score: 0,
          userId: 200,
          categoryId: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "What is Gurg?",
          text: "Grug need know what is Gurg?",
          score: 0,
          userId: 200,
          categoryId: 22,
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
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
