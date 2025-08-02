const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const db = require("./database/models");
const { Sequelize } = require('sequelize');
const cors = require("cors")
app.use(express.json())
app.use(cors())

app.get("/word/:language", async (req, res) => {
    let language = req.params.language
    const palabra = await db.word.findOne(
        {
            where: { isCompleted: false, language_id: language },
            order: Sequelize.literal("RAND()")
        })
    if (!palabra) return json.status(400).json("Error al encontrar palabra")
    res.json(palabra)
})

app.get("/word/:language/:dificulty", async (req, res) => {
    let dificulty = parseInt(req.params.dificulty)
    let language = req.params.language

    const palabra = await db.word.findOne(
        {
            where: { isCompleted: false, language_id: language, difficulty_id: dificulty },
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


app.get("/difficulty", async (req, res) => {
    const dificultades = await db.difficulty.findAll()
    res.json(dificultades)
})
app.get("/language", async (req, res) => {
    const languages = await db.language.findAll()
    res.json(languages)
})


app.put("/done", async (req, res) => {
    let palabraAEditar = req.body.palabra
    const palabraEncontrada = await db.word.findOne({ where: { name: palabraAEditar } })
    // if (!palabraEncontrada) return res.status(400).json("No se encontro la palabra")
    await palabraEncontrada.update({ isCompleted: true })
    return res.status(200).json("todo ok")
})

app.listen(port, async () => {
    // await db.sequelize.sync({ force: true });
    console.log(`App listening on  http://localhost:${port}`);
})