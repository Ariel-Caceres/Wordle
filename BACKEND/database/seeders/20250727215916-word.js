'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const palabras = [
      "sol", "luna", "estrella", "mar", "río", "bosque", "montaña", "flor", "fuego", "agua",
      "viento", "tierra", "cielo", "roca", "nube", "lluvia", "nieve", "arena", "trueno", "relámpago",
      "ciudad", "pueblo", "camino", "puente", "casa", "edificio", "torre", "ventana", "puerta", "calle",
      "coche", "tren", "barco", "avión", "bicicleta", "caballo", "pez", "pájaro", "perro", "gato",
      "niño", "niña", "hombre", "mujer", "amigo", "familia", "hermano", "madre", "padre", "abuelo",
      "fuego", "sombra", "luz", "oscuridad", "color", "pintura", "papel", "libro", "lápiz", "pluma",
      "escuela", "maestro", "estudiante", "examen", "tarea", "clase", "lección", "recreo", "oficina", "trabajo",
      "día", "noche", "mañana", "tarde", "ayer", "hoy", "mañana", "tiempo", "reloj", "calendario",
      "comida", "pan", "arroz", "fruta", "carne", "verdura", "leche", "agua", "jugo", "té",
      "fuerza", "poder", "coraje", "miedo", "alegría", "tristeza", "paz", "guerra", "vida", "muerte"
    ];
    
    const data = palabras.map((p)=>({
      name:p,
      isCompleted:false,
      createdAt: new Date(),
      updatedAt: new Date()

    }))
    await queryInterface.bulkInsert('words', data, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('words', null, {});

  }
};
