const { EstudianteCarrera } = require("../models");
const PagoMensualidad = require("../models/PagoMensualidad");

class ServicesPagoMensualidad {
  constructor() {
    this.sesion = {};
  }

  async getAllPagos() {
    try {
      const pagos = await EstudianteCarrera.findAll({
        attributes: ["id_estudiante_carrera", "nombre", "correo", "ru"],
        include: [
          {
            model: PagoMensualidad,
            as: "estudianteMensualidad",
          },
        ],
      });
      return pagos;
    } catch (error) {
      console.error("Error fetching all pagos:", error);
      throw error;
    }
  }

  async getPago(id) {
    try {
      const pago = await PagoMensualidad.findByPk(id);
      if (!pago) {
        throw new Error(`Pago con ID ${id} no encontrado`);
      }
      return pago;
    } catch (error) {
      console.error("Error fetching pago:", error);
      throw error;
    }
  }

  async createPago(data) {
    try {
      const newPago = await PagoMensualidad.create(data);
      return newPago;
    } catch (error) {
      console.error("Error creating pago:", error);
      throw error;
    }
  }

  async updatePago(id, data) {
    try {
      const pago = await this.getPago(id);
      await pago.update(data);
      return pago;
    } catch (error) {
      console.error("Error updating pago:", error);
      throw error;
    }
  }

  async deletePago(id) {
    try {
      const pago = await this.getPago(id);
      await pago.destroy();
      return { message: "Pago eliminado exitosamente" };
    } catch (error) {
      console.error("Error deleting pago:", error);
      throw error;
    }
  }
}

module.exports = ServicesPagoMensualidad;
