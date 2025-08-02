'use strict';

const Difficulty = require('../models/Difficulty');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    const words = [
      { name: "sol", language_id: 1, isCompleted: false, difficulty_id: 1 },
      { name: "pan", language_id: 1, isCompleted: false, difficulty_id: 1 },
      { name: "té", language_id: 1, isCompleted: false, difficulty_id: 1 },
      { name: "mar", language_id: 1, isCompleted: false, difficulty_id: 1 },
      { name: "voz", language_id: 1, isCompleted: false, difficulty_id: 1 },
      { name: "agua", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "libro", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "pluma", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "llave", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "fruta", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "jardín", language_id: 1, isCompleted: false, difficulty_id: 3 },
      { name: "ventana", language_id: 1, isCompleted: false, difficulty_id: 3 },
      { name: "cuchillo", language_id: 1, isCompleted: false, difficulty_id: 3 },
      { name: "pantalla", language_id: 1, isCompleted: false, difficulty_id: 3 },
      { name: "escalera", language_id: 1, isCompleted: false, difficulty_id: 3 },
      { name: "red", language_id: 1, isCompleted: false, difficulty_id: 1 },
      { name: "pez", language_id: 1, isCompleted: false, difficulty_id: 1 },
      { name: "luz", language_id: 1, isCompleted: false, difficulty_id: 1 },
      { name: "aire", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "nube", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "pasto", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "campo", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "arena", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "montaña", language_id: 1, isCompleted: false, difficulty_id: 3 },
      { name: "computadora", language_id: 1, isCompleted: false, difficulty_id: 3 },
      { name: "espejo", language_id: 1, isCompleted: false, difficulty_id: 3 },
      { name: "reloj", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "mesa", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "silla", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "cielo", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "soltero", language_id: 1, isCompleted: false, difficulty_id: 3 },
      { name: "familia", language_id: 1, isCompleted: false, difficulty_id: 3 },
      { name: "amigo", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "piedra", language_id: 1, isCompleted: false, difficulty_id: 3 },
      { name: "fuego", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "hoja", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "flor", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "raíz", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "tronco", language_id: 1, isCompleted: false, difficulty_id: 3 },
      { name: "bosque", language_id: 1, isCompleted: false, difficulty_id: 3 },
      { name: "río", language_id: 1, isCompleted: false, difficulty_id: 1 },
      { name: "lago", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "mariposa", language_id: 1, isCompleted: false, difficulty_id: 3 },
      { name: "abeja", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "hormiga", language_id: 1, isCompleted: false, difficulty_id: 3 },
      { name: "tigre", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "león", language_id: 1, isCompleted: false, difficulty_id: 2 },
      { name: "elefante", language_id: 1, isCompleted: false, difficulty_id: 3 },
      { name: "jirafa", language_id: 1, isCompleted: false, difficulty_id: 3 },

      { name: "sun", language_id: 2, isCompleted: false, difficulty_id: 1 },
      { name: "bread", language_id: 2, isCompleted: false, difficulty_id: 1 },
      { name: "tea", language_id: 2, isCompleted: false, difficulty_id: 1 },
      { name: "sea", language_id: 2, isCompleted: false, difficulty_id: 1 },
      { name: "voice", language_id: 2, isCompleted: false, difficulty_id: 1 },
      { name: "water", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "book", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "pen", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "key", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "fruit", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "garden", language_id: 2, isCompleted: false, difficulty_id: 3 },
      { name: "window", language_id: 2, isCompleted: false, difficulty_id: 3 },
      { name: "knife", language_id: 2, isCompleted: false, difficulty_id: 3 },
      { name: "screen", language_id: 2, isCompleted: false, difficulty_id: 3 },
      { name: "ladder", language_id: 2, isCompleted: false, difficulty_id: 3 },
      { name: "net", language_id: 2, isCompleted: false, difficulty_id: 1 },
      { name: "fish", language_id: 2, isCompleted: false, difficulty_id: 1 },
      { name: "light", language_id: 2, isCompleted: false, difficulty_id: 1 },
      { name: "air", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "cloud", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "grass", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "field", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "sand", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "mountain", language_id: 2, isCompleted: false, difficulty_id: 3 },
      { name: "computer", language_id: 2, isCompleted: false, difficulty_id: 3 },
      { name: "mirror", language_id: 2, isCompleted: false, difficulty_id: 3 },
      { name: "watch", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "table", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "chair", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "sky", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "single", language_id: 2, isCompleted: false, difficulty_id: 3 },
      { name: "family", language_id: 2, isCompleted: false, difficulty_id: 3 },
      { name: "friend", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "stone", language_id: 2, isCompleted: false, difficulty_id: 3 },
      { name: "fire", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "leaf", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "flower", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "root", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "trunk", language_id: 2, isCompleted: false, difficulty_id: 3 },
      { name: "forest", language_id: 2, isCompleted: false, difficulty_id: 3 },
      { name: "river", language_id: 2, isCompleted: false, difficulty_id: 1 },
      { name: "lake", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "butterfly", language_id: 2, isCompleted: false, difficulty_id: 3 },
      { name: "bee", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "ant", language_id: 2, isCompleted: false, difficulty_id: 3 },
      { name: "tiger", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "lion", language_id: 2, isCompleted: false, difficulty_id: 2 },
      { name: "elephant", language_id: 2, isCompleted: false, difficulty_id: 3 },
      { name: "giraffe", language_id: 2, isCompleted: false, difficulty_id: 3 }
    ];



    await queryInterface.bulkInsert('words', words, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('words', null, {});

  }
};
