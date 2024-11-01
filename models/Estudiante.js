const { Model, DataTypes } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");

class Estudiante extends Model {}

Estudiante.init(
  {
    id_estudiante: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Estudiante",
    tableName: "Estudiante",
    timestamps: true,
  }
);

module.exports = Estudiante;
