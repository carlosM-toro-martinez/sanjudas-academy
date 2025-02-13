const { Producto, Lote, MetodoVenta } = require("../models");
const Inventario = require("../models/Inventario");

class servicesInventario {
  constructor() {
    this.sesion = {};
  }

  async getAllProductosConInventarios() {
    try {
      const productos = await Producto.findAll({
        attributes: ["id_producto", "nombre", "codigo_barra"],
        include: [
          {
            model: Inventario,
            as: "inventarios",
            attributes: [
              "id_inventario",
              "cantidad",
              "subCantidad",
              "peso",
              "fecha_actualizacion",
              "id_trabajador",
            ],
            include: [
              {
                model: Lote,
                as: "lote",
                attributes: [
                  "id_lote",
                  "numero_lote",
                  "fecha_ingreso",
                  "cantidad",
                  "subCantidad",
                  "peso",
                  "cantidadPorCaja",
                ],
                include: [
                  {
                    model: Producto,
                    as: "producto",
                    attributes: [
                      "nombre",
                      "codigo_barra",
                      "precio",
                      "stock",
                      "peso",
                      "subCantidad",
                    ],
                    include: {
                      model: MetodoVenta,
                      as: "metodosVenta",
                      attributes: [
                        "id_metodo_venta",
                        "descripcion",
                        "cantidad_por_metodo",
                        "peso_por_metodo",
                        "precio",
                      ],
                    },
                  },
                ],
              },
            ],
          },
          // {
          //   model: MetodoVenta,
          //   as: "metodosVenta",
          //   attributes: [
          //     "id_metodo_venta",
          //     "descripcion",
          //     "cantidad_por_metodo",
          //     "precio",
          //   ],
          // },
        ],
        order: [["id_producto", "ASC"]],
      });

      return productos;
    } catch (error) {
      console.error(
        "Error fetching productos with inventarios and lotes:",
        error
      );
      throw error;
    }
  }

  async getInventario(id_inventario) {
    try {
      const inventario = await Inventario.findByPk(id_inventario);
      if (!inventario) {
        throw new Error(`Inventario with ID ${id_inventario} not found`);
      }
      return inventario;
    } catch (error) {
      console.error("Error fetching inventario:", error);
      throw error;
    }
  }

  async createInventario(data, transaction = null) {
    try {
      const newInventario = await Inventario.create(data, { transaction });
      return newInventario;
    } catch (error) {
      console.error("Error creating inventario:", error);
      throw error;
    }
  }

  async updateInventario(id_inventario, data) {
    try {
      const inventario = await Inventario.findByPk(id_inventario);
      if (!inventario) {
        throw new Error(`Inventario with ID ${id_inventario} not found`);
      }
      await inventario.update(data);
      return inventario;
    } catch (error) {
      console.error("Error updating inventario:", error);
      throw error;
    }
  }

  async deleteInventario(id_inventario) {
    try {
      const inventario = await Inventario.findByPk(id_inventario);
      if (!inventario) {
        throw new Error(`Inventario with ID ${id_inventario} not found`);
      }
      await inventario.destroy();
      return { message: "Inventario deleted successfully" };
    } catch (error) {
      console.error("Error deleting inventario:", error);
      throw error;
    }
  }
}

module.exports = servicesInventario;
