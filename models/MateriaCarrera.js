const { Model, DataTypes } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");
const Carrera = require("./Carrera");

class MateriaCarrera extends Model {}
MateriaCarrera.init(
  {
    id_materia_carrera: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: { type: DataTypes.STRING, unique: true },
    id_carrera: {
      type: DataTypes.INTEGER,
      references: { model: Carrera, key: "id_carrera" },
    },
  },
  {
    sequelize,
    modelName: "MateriaCarrera",
    tableName: "MateriaCarrera",
    timestamps: false,
  }
);
module.exports = MateriaCarrera;
