
module.exports = (sequelize, DataTypes) => {
    const alias = "word"
    const cols = {
        name:DataTypes.STRING,
        isCompleted: DataTypes.BOOLEAN
    }
    const config = {
        tableName:"words",
        paranoid:true
    }
    const Word = sequelize.define(alias, cols, config)
    return Word
}