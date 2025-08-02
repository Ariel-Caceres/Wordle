
module.exports = (sequelize, DataTypes) => {
    const alias = "language"
    const cols = {
        name: DataTypes.STRING
    }
    const config = {
        tableName: "languages",
        paranoid: true
    }
    const Language = sequelize.define(alias, cols, config)
    Language.associate = (model) => {
        Language.hasMany(model.word, {
            as: "words",
            foreignKey: "language_id"
        })

    }
    return Language
}