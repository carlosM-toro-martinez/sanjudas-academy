const InscripcionMateria = require("../models/InscripcionMateria");

class servicesInscripcionMateria {
  constructor() {
    this.sesion = {};
  }

  async getAllInscripcionMateria() {
    try {
      const inscripciones = await InscripcionMateria.findAll();
      return inscripciones;
    } catch (error) {
      console.error("Error fetching all inscripcion materia:", error);
      throw error;
    }
  }

  async getInscripcionMateria(id) {
    try {
      const inscripcion = await InscripcionMateria.findByPk(id);
      if (!inscripcion) {
        throw new Error(`InscripcionMateria with ID ${id} not found`);
      }
      return inscripcion;
    } catch (error) {
      console.error("Error fetching inscripcion materia:", error);
      throw error;
    }
  }

  async createInscripcionMateria(data) {
    try {
      const newInscripcion = await InscripcionMateria.create(data);
      return newInscripcion;
    } catch (error) {
      console.error("Error creating inscripcion materia:", error);
      throw error;
    }
  }

  async updateInscripcionMateria(id, data) {
    try {
      const inscripcion = await this.getInscripcionMateria(id);
      await inscripcion.update(data);
      return inscripcion;
    } catch (error) {
      console.error("Error updating inscripcion materia:", error);
      throw error;
    }
  }

  async deleteInscripcionMateria(id) {
    try {
      const inscripcion = await this.getInscripcionMateria(id);
      await inscripcion.destroy();
      return { message: "InscripcionMateria deleted successfully" };
    } catch (error) {
      console.error("Error deleting inscripcion materia:", error);
      throw error;
    }
  }
}

module.exports = servicesInscripcionMateria;
