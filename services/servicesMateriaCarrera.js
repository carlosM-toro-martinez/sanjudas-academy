const MateriaCarrera = require("../models/MateriaCarrera");

class servicesMateriaCarrera {
  constructor() {
    this.sesion = {};
  }

  async getAllMateriaCarreras() {
    try {
      const materias = await MateriaCarrera.findAll();
      return materias;
    } catch (error) {
      console.error("Error fetching all materia carrera:", error);
      throw error;
    }
  }

  async getMateriaCarrera(id) {
    try {
      const materia = await MateriaCarrera.findByPk(id);
      if (!materia) {
        throw new Error(`MateriaCarrera with ID ${id} not found`);
      }
      return materia;
    } catch (error) {
      console.error("Error fetching materia carrera:", error);
      throw error;
    }
  }

  async createMateriaCarrera(data) {
    try {
      const newMateria = await MateriaCarrera.create(data);
      return newMateria;
    } catch (error) {
      console.error("Error creating materia carrera:", error);
      throw error;
    }
  }

  async updateMateriaCarrera(id, data) {
    try {
      const materia = await this.getMateriaCarrera(id);
      await materia.update(data);
      return materia;
    } catch (error) {
      console.error("Error updating materia carrera:", error);
      throw error;
    }
  }

  async deleteMateriaCarrera(id) {
    try {
      const materia = await this.getMateriaCarrera(id);
      await materia.destroy();
      return { message: "MateriaCarrera deleted successfully" };
    } catch (error) {
      console.error("Error deleting materia carrera:", error);
      throw error;
    }
  }
}

module.exports = servicesMateriaCarrera;
