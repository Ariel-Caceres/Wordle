
module.exports = (sequelize, DataTypes) => {
    const alias = "difficulty"
    const cols = {
        name: DataTypes.STRING
    }
    const config = {
        tableName: "difficulties",
        paranoid: true
    }
    const Difficulty = sequelize.define(alias, cols, config)
    Difficulty.associate = (model) => {
        Difficulty.hasMany(model.word, {
            as: "words",
            foreignKey: "difficulty_id"
        })

    }
    return Difficulty
}