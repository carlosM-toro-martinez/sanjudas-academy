const { Model, DataTypes } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");

class Ambiente extends Model {}
Ambiente.init(
  {
    id_ambiente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      unique: true,
    },
    capacidad: {
      type: DataTypes.INTEGER,
    },
    ubicacion: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Ambiente",
    tableName: "Ambiente",
    timestamps: false,
  }
);

module.exports = Ambiente;
