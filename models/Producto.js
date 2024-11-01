const { Model, DataTypes } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");

class Producto extends Model {}

Producto.init(
  {
    id_producto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: DataTypes.STRING,
    codigo_barra: {
      type: DataTypes.STRING,
      unique: true,
    },
    precio: DataTypes.DECIMAL(10, 2),
    peso: DataTypes.DECIMAL(10, 2),
    subCantidad: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    id_categoria: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categoria",
        key: "id_categoria",
      },
    },
  },
  {
    sequelize,
    modelName: "Producto",
    tableName: "Producto",
    timestamps: false,
  }
);

module.exports = Producto;
