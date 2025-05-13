const { Model, DataTypes } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");

class PagoParcial extends Model {}

PagoParcial.init(
  {
    id_pago_parcial: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_pago: {
      type: DataTypes.INTEGER,
      references: {
        model: "PagoMensualidad",
        key: "id_pago",
      },
      allowNull: false,
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fecha_pago: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    observacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "PagoParcial",
    tableName: "PagoParcial",
    timestamps: false,
  }
);

module.exports = PagoParcial;
