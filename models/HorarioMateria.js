const { Model, DataTypes } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");

class HorarioMateria extends Model {}

HorarioMateria.init(
  {
    id_horario_materia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_horario: {
      type: DataTypes.INTEGER,
      references: {
        model: "Horario",
        key: "id_horario",
      },
      allowNull: false,
    },
    id_materia: {
      type: DataTypes.INTEGER,
      references: {
        model: "Materia",
        key: "id_materia",
      },
      allowNull: false,
    },
    id_docente: {
      type: DataTypes.INTEGER,
      references: {
        model: "Docente",
        key: "id_docente",
      },
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "HorarioMateria",
    tableName: "HorarioMateria",
    timestamps: true,

    indexes: [
      {
        unique: true,
        fields: ["id_horario_materia"],
      },
    ],
  }
);

module.exports = HorarioMateria;
