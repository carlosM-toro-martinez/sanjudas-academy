const EstudianteCarrera = require("../models/EstudianteCarrera");

class servicesEstudianteCarrera {
  constructor() {
    this.sesion = {};
  }

  async getAllEstudiantesCarrera() {
    try {
      const estudiantes = await EstudianteCarrera.findAll();
      return estudiantes;
    } catch (error) {
      console.error("Error fetching all estudiantes carrera:", error);
      throw error;
    }
  }

  async getEstudianteCarrera(id) {
    try {
      const estudiante = await EstudianteCarrera.findByPk(id);
      if (!estudiante) {
        throw new Error(`EstudianteCarrera with ID ${id} not found`);
      }
      return estudiante;
    } catch (error) {
      console.error("Error fetching estudiante carrera:", error);
      throw error;
    }
  }

  async createEstudianteCarrera(data) {
    try {
      const newEstudiante = await EstudianteCarrera.create(data);
      return newEstudiante;
    } catch (error) {
      console.error("Error creating estudiante carrera:", error);
      throw error;
    }
  }

  async updateEstudianteCarrera(id, data) {
    try {
      const estudiante = await this.getEstudianteCarrera(id);
      await estudiante.update(data);
      return estudiante;
    } catch (error) {
      console.error("Error updating estudiante carrera:", error);
      throw error;
    }
  }

  async deleteEstudianteCarrera(id) {
    try {
      const estudiante = await this.getEstudianteCarrera(id);
      await estudiante.destroy();
      return { message: "EstudianteCarrera deleted successfully" };
    } catch (error) {
      console.error("Error deleting estudiante carrera:", error);
      throw error;
    }
  }
}

module.exports = servicesEstudianteCarrera;
