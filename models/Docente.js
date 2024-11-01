const { Model, DataTypes } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");

class Docente extends Model {}

Docente.init(
  {
    id_docente: {
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
    especialidad: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fecha_contratacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Docente",
    tableName: "Docente",
    timestamps: true,
  }
);

module.exports = Docente;
