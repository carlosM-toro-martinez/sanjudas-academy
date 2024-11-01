const Caja = require("../models/Caja");
const DenominacionCaja = require("../models/DenominacionCaja");
const MovimientoCaja = require("../models/MovimientoCaja");
const sequelize = require("../libs/dbConexionORM");

class servicesCaja {
  constructor() {
    this.sesion = {};
  }

  async abrirCaja(monto_inicial, denominaciones, id_trabajador) {
    const t = await sequelize.transaction();

    try {
      const nuevaCaja = await Caja.create(
        {
          monto_inicial,
          monto_final: monto_inicial,
          fecha_apertura: new Date(),
          id_trabajador,
        },
        { transaction: t }
      );

      for (const denom of denominaciones) {
        await DenominacionCaja.create(
          {
            id_caja: nuevaCaja.id_caja,
            tipo_dinero: denom.tipo_dinero,
            denominacion: denom.denominacion,
            cantidad: denom.cantidad,
          },
          { transaction: t }
        );
      }

      await MovimientoCaja.create(
        {
          id_caja: nuevaCaja.id_caja,
          tipo_movimiento: "apertura",
          monto: monto_inicial,
          fecha_movimiento: nuevaCaja.fecha_apertura,
          id_trabajador,
          motivo: "Apertura de caja",
        },
        { transaction: t }
      );

      await t.commit();
      return nuevaCaja;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async cerrarCaja(id_caja, id_trabajador) {
    const t = await sequelize.transaction();

    try {
      const caja = await Caja.findByPk(id_caja);
      if (!caja) {
        throw new Error(`Caja with ID ${id_caja} not found`);
      }

      await MovimientoCaja.create(
        {
          id_caja,
          tipo_movimiento: "cierre",
          monto: caja.monto_final,
          fecha_movimiento: new Date(),
          id_trabajador,
          motivo: "Cierre de caja",
        },
        { transaction: t }
      );

      caja.fecha_cierre = new Date();
      await caja.save({ transaction: t });

      await t.commit();
      return caja;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async getLastCajaDenominacion() {
    try {
      const lastCaja = await Caja.findOne({
        order: [["id_caja", "DESC"]],
        include: {
          model: DenominacionCaja,
          as: "denominaciones",
          attributes: ["denominacion", "cantidad", "tipo_dinero"],
          required: true,
        },
      });

      if (!lastCaja) {
        return {
          caja: {
            monto_inicial: 0,
            monto_final: 0,
            fecha_apertura: "2024-09-26T10:00:00.000Z",
            fecha_cierre: "2024-09-26T10:00:00.000Z",
          },
          denominaciones: [
            { tipo_dinero: "billete", denominacion: 200, cantidad: 0 },
            { tipo_dinero: "billete", denominacion: 100, cantidad: 0 },
            { tipo_dinero: "billete", denominacion: 50, cantidad: 0 },
            { tipo_dinero: "billete", denominacion: 20, cantidad: 0 },
            { tipo_dinero: "billete", denominacion: 10, cantidad: 0 },
            { tipo_dinero: "moneda", denominacion: 5, cantidad: 0 },
            { tipo_dinero: "moneda", denominacion: 2, cantidad: 0 },
            { tipo_dinero: "moneda", denominacion: 1, cantidad: 0 },
            { tipo_dinero: "moneda", denominacion: 0.5, cantidad: 0 },
            { tipo_dinero: "moneda", denominacion: 0.2, cantidad: 0 },
            { tipo_dinero: "moneda", denominacion: 0.1, cantidad: 0 },
          ],
        };
      }

      return {
        caja: {
          id_caja: lastCaja.id_caja,
          monto_inicial: lastCaja.monto_inicial,
          monto_final: lastCaja.monto_final,
          fecha_apertura: lastCaja.fecha_apertura,
          fecha_cierre: lastCaja.fecha_cierre,
          id_trabajador: lastCaja.id_trabajador,
        },
        denominaciones: lastCaja.denominaciones,
      };
    } catch (error) {
      console.error("Error fetching last caja denominacion:", error);
      throw error;
    }
  }

  async getAllCajas() {
    try {
      const cajas = await Caja.findAll();
      return cajas;
    } catch (error) {
      console.error("Error fetching all cajas:", error);
      throw error;
    }
  }

  async getCaja(id_caja) {
    try {
      const caja = await Caja.findByPk(id_caja);
      if (!caja) {
        throw new Error(`Caja with ID ${id_caja} not found`);
      }
      return caja;
    } catch (error) {
      console.error("Error fetching caja:", error);
      throw error;
    }
  }

  async createCaja(data) {
    try {
      const newCaja = await Caja.create(data);
      return newCaja;
    } catch (error) {
      console.error("Error creating caja:", error);
      throw error;
    }
  }

  async updateCaja(id_caja, data) {
    try {
      const caja = await Caja.findByPk(id_caja);
      if (!caja) {
        throw new Error(`Caja with ID ${id_caja} not found`);
      }
      await caja.update(data);
      return caja;
    } catch (error) {
      console.error("Error updating caja:", error);
      throw error;
    }
  }

  async deleteCaja(id_caja) {
    try {
      const caja = await Caja.findByPk(id_caja);
      if (!caja) {
        throw new Error(`Caja with ID ${id_caja} not found`);
      }
      await caja.destroy();
      return { message: "Caja deleted successfully" };
    } catch (error) {
      console.error("Error deleting caja:", error);
      throw error;
    }
  }
}

module.exports = servicesCaja;
