const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const db = require("./database/models");
const { Sequelize } = require('sequelize');
const cors = require("cors")
app.use(express.json())
app.use(cors())

app.get("/word/spanish", async (req, res) => {
    const palabra = await db.word.findOne(
        {
            where: { isCompleted: false, language_id: 1 },
            order: Sequelize.literal("RAND()")
        })
    if (!palabra) return json.status(400).json("Error al encontrar palabra")
    res.json(palabra)
})

app.get("/word/spanish/:dificulty", async (req, res) => {
    let dificulty = parseInt(req.params.dificulty)

    const palabra = await db.word.findOne(
        {
            where: { isCompleted: false, language_id: 1, difficulty_id: { dificulty } },
            order: Sequelize.literal("RAND()")
        })
    if (!palabra) return json.status(400).json("Error al encontrar palabra")
    res.json(palabra)
})

app.get("/word/english", async (req, res) => {

    const palabra = await db.word.findOne(
        {
            where: { isCompleted: false, language: 2 },
            order: Sequelize.literal("RAND()")
        })
    if (!palabra) return json.status(400).json("Error al encontrar palabra")
    res.json(palabra)
})

app.get("/word/english/:difficulty", async (req, res) => {
    let difficulty = parseInt(req.params.difficulty)
    const palabra = await db.word.findOne(
        {
            where: { isCompleted: false, language_id: { difficulty } },
            order: Sequelize.literal("RAND()")
        })
    if (!palabra) return json.status(400).json("Error al encontrar palabra")
    res.json(palabra)
})

app.get("/word/randomLanguage", async (req, res) => {
    const palabra = await db.word.findOne(
        {
            where: { isCompleted: false },
            order: Sequelize.literal("RAND()")
        })
    if (!palabra) return json.status(400).json("Error al encontrar palabra")
    res.json(palabra)
})

app.put("/done", async (req, res) => {
    let palabraAEditar = req.body.palabra
    const palabraEncontrada = await db.word.findOne({ where: { name: palabraAEditar } })
    if (!palabraEncontrada) return json.status(400).json("No se encontro la palabra")
    await palabraEncontrada.update({ isCompleted: true })
    res.json("todo ok")
})

app.listen(port, async () => {
    // await db.sequelize.sync({ force: true });
    console.log(`App listening on  http://localhost:${port}`);
})