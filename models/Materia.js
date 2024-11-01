// models/Materia.js

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");
const Horario = require("./Horario");

class Materia extends Model {}

Materia.init(
  {
    id_materia: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Materia",
    tableName: "Materia",
    timestamps: true,
  }
);

module.exports = Materia;
