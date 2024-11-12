const { Model, DataTypes } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");
const Producto = require("./Producto");
const Trabajador = require("./Trabajador");

class MovimientoInventario extends Model {}

MovimientoInventario.init(
  {
    id_movimiento: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_producto: {
      type: DataTypes.INTEGER,
      references: {
        model: Producto,
        key: "id_producto",
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    subCantidad: DataTypes.INTEGER,
    fecha_movimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tipo_movimiento: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    id_trabajador: {
      type: DataTypes.INTEGER,
      references: {
        model: Trabajador,
        key: "id_trabajador",
      },
    },
    lote: {
      type: DataTypes.STRING(255),
    },
  },
  {
    sequelize,
    modelName: "MovimientoInventario",
    tableName: "MovimientoInventario",
    timestamps: false,
  }
);

module.exports = MovimientoInventario;
