const { Model, DataTypes } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");

class PagoMensualidad extends Model {}

PagoMensualidad.init(
  {
    id_pago: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_estudiante_carrera: {
      type: DataTypes.INTEGER,
      references: {
        model: "EstudianteCarrera",
        key: "id_estudiante_carrera",
      },
      allowNull: false,
    },
    modulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_pago: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: new Date().getFullYear(),
    },
    monto_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "PagoMensualidad",
    tableName: "PagoMensualidad",
    timestamps: false,
  }
);

module.exports = PagoMensualidad;
