const { EstudianteCarrera } = require("../models");
const PagoMensualidad = require("../models/PagoMensualidad");
const { fn, col } = require("sequelize");

class ServicesPagoMensualidad {
  constructor() {
    this.sesion = {};
  }

  async getAllPagos() {
    try {
      const pagos = await EstudianteCarrera.findAll({
        attributes: [
          "id_estudiante_carrera",
          "nombre",
          "apellido_paterno",
          "apellido_materno",
          "correo",
          "ru",
        ],
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

  async getEstudiantesConPagoPorModulo(moduloBusqueda) {
    try {
      const estudiantes = await EstudianteCarrera.findAll({
        attributes: [
          "id_estudiante_carrera",
          "nombre",
          "apellido_paterno",
          "apellido_materno",
          "ru",
        ],
        include: [
          {
            model: PagoMensualidad,
            as: "estudianteMensualidad",
            where: { modulo: moduloBusqueda },
            required: true,
          },
        ],
      });

      const resultado = estudiantes.map((e) => {
        const montoPagado = e.estudianteMensualidad.reduce(
          (sum, pago) => sum + parseFloat(pago.monto),
          0
        );
        return {
          nombreCompleto: `${e.nombre} ${e.apellido_paterno} ${e.apellido_materno}`,
          ru: e.ru,
          montoPagado,
          fecha_pago: e.estudianteMensualidad[0].fecha_pago,
        };
      });
      console.log(resultado);

      return resultado;
    } catch (error) {
      console.error(
        `Error fetching estudiantes con pago módulo=${moduloBusqueda}:`,
        error
      );
      throw error;
    }
  }

  async getModulos() {
    try {
      const modulos = await PagoMensualidad.findAll({
        attributes: [[fn("DISTINCT", col("modulo")), "modulo"]],
        raw: true,
      });

      const listaModulos = modulos.map((m) => m.modulo);
      return listaModulos;
    } catch (error) {
      console.error("Error fetching módulos:", error);
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
