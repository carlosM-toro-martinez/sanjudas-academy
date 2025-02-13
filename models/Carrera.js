const { Model, DataTypes } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");

class Carrera extends Model {}
Carrera.init(
  {
    id_carrera: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      unique: true,
    },
    facultad: {
      type: DataTypes.STRING,
    },
    cantidad_semestres: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Carrera",
    tableName: "Carrera",
    timestamps: false,
  }
);

module.exports = Carrera;
