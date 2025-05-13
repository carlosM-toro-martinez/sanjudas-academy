const sequelize = require("../libs/dbConexionORM");
const { EstudianteCarrera } = require("../models");
const PagoMensualidad = require("../models/PagoMensualidad");
const { fn, col } = require("sequelize");
const PagoParcial = require("../models/PagoParcial");

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
            include: [
              {
                model: PagoParcial,
                as: "pagos_parciales",
                attributes: [
                  "id_pago_parcial",
                  "monto",
                  "fecha_pago",
                  "observacion",
                ],
              },
            ],
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
    return await sequelize.transaction(async (t) => {
      const year = new Date(data.fecha_pago).getFullYear();

      const [pagoMensualidad] = await PagoMensualidad.findOrCreate({
        where: {
          id_estudiante_carrera: data.id_estudiante_carrera,
          modulo: data.modulo,
          year,
        },
        defaults: {
          ...data,
          monto: 0,
          monto_total: 0,
          year,
        },
        transaction: t,
      });

      const nuevoMontoTotal =
        parseFloat(pagoMensualidad.monto_total) + parseFloat(data.monto);

      pagoMensualidad.monto_total = nuevoMontoTotal;
      pagoMensualidad.monto = nuevoMontoTotal;
      pagoMensualidad.fecha_pago = data.fecha_pago;
      pagoMensualidad.observacion = data.observacion || null;
      await pagoMensualidad.save({ transaction: t });

      await PagoParcial.create(
        {
          id_pago: pagoMensualidad.id_pago,
          monto: data.monto,
          fecha_pago: data.fecha_pago,
          observacion: data.observacion || null,
        },
        { transaction: t }
      );

      return pagoMensualidad;
    });
  }

  async createPagoParcial(data) {
    return await sequelize.transaction(async (t) => {
      // 1. Crear el pago parcial
      const nuevoParcial = await PagoParcial.create(
        {
          id_pago: data.id_pago,
          monto: data.monto,
          fecha_pago: data.fecha_pago,
          observacion: data.observacion || null,
        },
        { transaction: t }
      );

      // 2. Obtener la mensualidad y acumular el monto
      const mensualidad = await PagoMensualidad.findByPk(data.id_pago, {
        transaction: t,
      });
      if (!mensualidad) {
        throw new Error(
          `No se encontró PagoMensualidad con id ${data.id_pago}`
        );
      }

      const montoActual = parseFloat(mensualidad.monto_total);
      const nuevoMonto = parseFloat(data.monto);
      mensualidad.monto_total = montoActual + nuevoMonto;
      // Opcional: actualizar también `monto` (último) y `fecha_pago`
      mensualidad.monto = parseFloat(mensualidad.monto) + nuevoMonto;
      mensualidad.fecha_pago = data.fecha_pago;
      await mensualidad.save({ transaction: t });

      // 3. Devolver el registro creado
      return nuevoParcial;
    });
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
