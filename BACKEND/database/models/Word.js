const Difficulty = require("./Difficulty");

module.exports = (sequelize, DataTypes) => {
    const alias = "word";
    const cols = {
        name: DataTypes.STRING,
        language_id: {
            type: DataTypes.INTEGER,
            references: { model: "languages", key: "id" },
        },
        isCompleted: DataTypes.BOOLEAN,
        difficulty_id: {
            type: DataTypes.INTEGER,
            references: { model: "difficulties", key: "id" },
        },
    };
    const config = {
        tableName: "words",
        paranoid: true,
    };
    const Word = sequelize.define(alias, cols, config);
    Word.associate = (model) => {
        Word.belongsTo(model.difficulty, {
            as: "difficulty",
            foreignKey: "difficulty_id",
        });
        Word.belongsTo(model.language, {
            as: "language",
            foreignKey: "language_id",
        });
    };
    return Word;
};
