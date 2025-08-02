"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const ds = [
            { name: "easy", createdAt: new Date(), updatedAt: new Date() },
            { name: "normal", createdAt: new Date(), updatedAt: new Date() },
            { name: "hard", createdAt: new Date(), updatedAt: new Date() },
        ];

        await queryInterface.bulkInsert("difficulties", ds, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("difficulties", null, {});
    },
};
