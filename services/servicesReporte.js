const express = require("express");
const { Op } = require("sequelize");
const {
  MovimientoInventario,
  Producto,
  Lote,
  DetalleCompra,
  MovimientoCaja,
  Trabajador,
  Venta,
  Proveedor,
  Cliente,
  DetalleVenta,
  Caja,
} = require("../models");

class servicesReporte {
  constructor() {}

  // async getLotesConDetalleCompra(idInicio, idFin) {
  //   try {
  //     const lotes = await Lote.findAll({
  //       where: {
  //         id_lote: {
  //           [Op.between]: [idInicio, idFin],
  //         },
  //       },
  //       include: [
  //         {
  //           model: DetalleCompra,
  //           as: "detalleCompra",
  //           attributes: [
  //             "id_detalle",
  //             "cantidad",
  //             "precio_unitario",
  //             "fecha_compra",
  //           ],
  //           include: [
  //             {
  //               model: Producto,
  //               as: "producto",
  //               attributes: ["id_producto", "nombre", "codigo_barra"],
  //             },
  //           ],
  //         },
  //       ],
  //     });

  //     return lotes;
  //   } catch (error) {
  //     console.error("Error fetching lotes con detalle de compra:", error);
  //     throw error;
  //   }
  // }

  async getLotesConDetalleCompra(idInicio, idFin) {
    try {
      // Consulta para obtener todos los lotes en el rango de ID
      const lotes = await Lote.findAll({
        where: {
          id_lote: {
            [Op.between]: [idInicio, idFin],
          },
        },
        include: [
          {
            model: DetalleCompra,
            as: "detalleCompra",
            attributes: [
              "id_detalle",
              "id_proveedor",
              "cantidad",
              "precio_unitario",
              "fecha_compra",
            ],
            include: [
              {
                model: Producto,
                as: "producto",
                attributes: ["id_producto", "nombre", "codigo_barra"],
              },
              {
                model: Proveedor,
                as: "proveedor",
                attributes: ["id_proveedor", "nombre"],
              },
            ],
          },
        ],
      });

      // Agrupar los lotes por numero_lote
      const lotesAgrupados = lotes.reduce((agrupados, lote) => {
        const { numero_lote } = lote;
        if (!agrupados[numero_lote]) {
          agrupados[numero_lote] = [];
        }
        agrupados[numero_lote].push(lote);
        return agrupados;
      }, {});

      // Convertir el objeto a un array de grupos
      const resultado = Object.keys(lotesAgrupados).map((numeroLote) => ({
        numero_lote: numeroLote,
        lotes: lotesAgrupados[numeroLote].map((lote) => ({
          id_lote: lote.id_lote,
          fecha_ingreso: lote.fecha_ingreso,
          fecha_caducidad: lote.fecha_caducidad,
          cantidad: lote.cantidad,
          detalleCompra: {
            id_detalle: lote.detalleCompra.id_detalle,
            id_proveedor: lote.detalleCompra.id_proveedor,
            cantidad: lote.detalleCompra.cantidad,
            precio_unitario: lote.detalleCompra.precio_unitario,
            fecha_compra: lote.detalleCompra.fecha_compra,
            producto: {
              id_producto: lote.detalleCompra.producto.id_producto,
              nombre: lote.detalleCompra.producto.nombre,
              codigo_barra: lote.detalleCompra.producto.codigo_barra,
            },
            proveedor: {
              id_proveedor: lote.detalleCompra.proveedor.id_proveedor,
              nombre: lote.detalleCompra.proveedor.nombre,
            },
          },
        })),
      }));

      return resultado;
    } catch (error) {
      console.error(
        "Error fetching lotes agrupados por numero de lote:",
        error
      );
      throw error;
    }
  }

  async getComprasProveedor() {
    try {
      const proveedores = await Proveedor.findAll({
        attributes: ["id_proveedor", "nombre"],
        include: [
          {
            model: DetalleCompra,
            as: "compras",
            attributes: [
              "id_detalle_compra",
              "cantidad",
              "precio",
              "fecha_compra",
            ],
            include: [
              {
                model: Producto,
                as: "producto",
                attributes: ["id_producto", "nombre"],
                include: [
                  {
                    model: Lote,
                    as: "lotes",
                    attributes: [
                      "id_lote",
                      "numero_lote",
                      "cantidad",
                      "fecha_caducidad",
                    ],
                  },
                ],
              },
            ],
          },
        ],
        order: [["id_proveedor", "ASC"]], // Ordenar por id_proveedor o como prefieras
      });

      return proveedores;
    } catch (error) {
      console.error("Error fetching compras por proveedor:", error);
      throw error;
    }
  }

  // Método para obtener movimientos de caja entre fechas
  async getMovimientosCaja(idInicio, idFin) {
    try {
      const cajas = await Caja.findAll({
        where: {
          id_caja: {
            [Op.between]: [idInicio, idFin],
          },
        },
        include: [
          {
            model: MovimientoCaja,
            as: "movimientos",
            include: [
              {
                model: Trabajador,
                as: "trabajadorMovimiento",
              },
            ],
          },
          {
            model: Trabajador,
            as: "trabajadorCierre",
          },
        ],
      });

      return cajas;
    } catch (error) {
      console.error("Error fetching movimientos de caja:", error);
      throw error;
    }
  }

  // Método para obtener todas las ventas
  async getVentas(idInicio, idFin) {
    try {
      const ventas = await Venta.findAll({
        where: {
          id_venta: {
            [Op.between]: [idInicio, idFin],
          },
        },
        include: [
          {
            model: Trabajador,
            as: "trabajadorVenta",
            attributes: ["nombre"],
          },
          {
            model: Cliente,
            as: "cliente",
            attributes: ["nombre", "apellido"],
          },
          {
            model: DetalleVenta,
            as: "detallesVenta",
            include: [
              {
                model: Producto,
                as: "producto",
                attributes: ["nombre"],
              },
            ],
            attributes: ["cantidad", "precio_unitario"],
          },
        ],
      });
      return ventas;
    } catch (error) {
      console.error("Error fetching ventas:", error);
      throw error;
    }
  }
}

module.exports = servicesReporte;
