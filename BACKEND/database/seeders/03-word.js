'use strict';

const Difficulty = require('../models/Difficulty');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    const data = [{
      name: "hola",
      language_id: 1,
      difficulty_id: 2,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }]

    await queryInterface.bulkInsert('words', data, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('words', null, {});

  }
};
