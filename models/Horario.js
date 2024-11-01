// models/Horario.js

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");
const Materia = require("./Materia");

class Horario extends Model {}

Horario.init(
  {
    id_horario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Horario",
    tableName: "Horario",
    timestamps: true,
  }
);

module.exports = Horario;
