"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const ls = [
            { name: "spanish", createdAt: new Date(), updatedAt: new Date() },
            { name: "english", createdAt: new Date(), updatedAt: new Date() },
        ];

        await queryInterface.bulkInsert("languages", ls, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("languages", null, {});
    },
};
