const MovimientoCaja = require("../models/MovimientoCaja");
const Caja = require("../models/Caja");
const DenominacionCaja = require("../models/DenominacionCaja");
const sequelize = require("../libs/dbConexionORM");

class servicesMovimientoCaja {
  constructor() {
    this.sesion = {};
  }
  async crearMovimientoCaja(
    id_caja,
    tipo_movimiento,
    monto,
    id_trabajador,
    motivo,
    fecha_movimiento,
    denominacionesDetalles
  ) {
    const t = await sequelize.transaction();

    try {
      const movimiento = await MovimientoCaja.create(
        {
          id_caja,
          tipo_movimiento,
          monto,
          id_trabajador,
          fecha_movimiento,
          motivo,
        },
        { transaction: t }
      );

      const caja = await Caja.findByPk(id_caja, { transaction: t });
      if (!caja) {
        throw new Error(`Caja with ID ${id_caja} not found`);
      }
      caja.monto_final = parseFloat(caja.monto_final) + parseFloat(monto);

      await caja.save({ transaction: t });

      const denominaciones = await DenominacionCaja.findAll({
        where: { id_caja },
        transaction: t,
      });
      for (const detalle of denominacionesDetalles) {
        const { tipo_dinero, denominacion, cantidad } = detalle;
        const denominacionExistente = denominaciones.find(
          (d) =>
            d.tipo_dinero === tipo_dinero &&
            parseFloat(d.denominacion) === parseFloat(denominacion)
        );

        if (!denominacionExistente) {
          throw new Error(
            `Denominación ${denominacion} ${tipo_dinero} no encontrada en la caja.`
          );
        }
        denominacionExistente.cantidad = cantidad;
        console.log(tipo_dinero, denominacion, cantidad);

        console.log(denominacionExistente);
        await denominacionExistente.save({ transaction: t });
      }

      await t.commit();
      return movimiento;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async getAllMovimientos() {
    try {
      const movimientos = await MovimientoCaja.findAll();
      return movimientos;
    } catch (error) {
      console.error("Error fetching all movimientos:", error);
      throw error;
    }
  }

  async getMovimiento(id_movimiento) {
    try {
      const movimiento = await MovimientoCaja.findByPk(id_movimiento);
      if (!movimiento) {
        throw new Error(`Movimiento with ID ${id_movimiento} not found`);
      }
      return movimiento;
    } catch (error) {
      console.error("Error fetching movimiento:", error);
      throw error;
    }
  }

  async createMovimiento(data) {
    try {
      const newMovimiento = await MovimientoCaja.create(data);
      return newMovimiento;
    } catch (error) {
      console.error("Error creating movimiento:", error);
      throw error;
    }
  }

  async updateMovimiento(id_movimiento, data) {
    try {
      const movimiento = await MovimientoCaja.findByPk(id_movimiento);
      if (!movimiento) {
        throw new Error(`Movimiento with ID ${id_movimiento} not found`);
      }
      await movimiento.update(data);
      return movimiento;
    } catch (error) {
      console.error("Error updating movimiento:", error);
      throw error;
    }
  }

  async deleteMovimiento(id_movimiento) {
    try {
      const movimiento = await MovimientoCaja.findByPk(id_movimiento);
      if (!movimiento) {
        throw new Error(`Movimiento with ID ${id_movimiento} not found`);
      }
      await movimiento.destroy();
      return { message: "Movimiento deleted successfully" };
    } catch (error) {
      console.error("Error deleting movimiento:", error);
      throw error;
    }
  }
}

module.exports = servicesMovimientoCaja;
