const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const db = require("./database/models");
const { Sequelize } = require('sequelize');
const cors = require("cors")
app.use(express.json())
app.use(cors())

app.get("/word", async (req, res) => {
    const palabra = await db.word.findOne(
        {
            where: { isCompleted: false },
            order: Sequelize.literal("RAND()")
        })
    if (!palabra) return json.status(400).json("Error al encontrar la palabra")

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