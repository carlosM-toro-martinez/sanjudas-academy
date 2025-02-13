const { MateriaCarrera } = require("../models");
const Carrera = require("../models/Carrera");

class servicesCarrera {
  constructor() {
    this.sesion = {};
  }

  async getAllCarreras() {
    try {
      const carreras = await Carrera.findAll({
        include: [
          {
            model: MateriaCarrera,
            as: "materiasCarrera",
            order: [["semestre", "ASC"]],
          },
        ],
      });

      return carreras;
    } catch (error) {
      console.error("Error fetching all carreras:", error);
      throw error;
    }
  }

  async getCarrera(id) {
    try {
      const carrera = await Carrera.findByPk(id);
      if (!carrera) {
        throw new Error(`Carrera with ID ${id} not found`);
      }
      return carrera;
    } catch (error) {
      console.error("Error fetching carrera:", error);
      throw error;
    }
  }

  async createCarrera(data) {
    try {
      const newCarrera = await Carrera.create(data);
      return newCarrera;
    } catch (error) {
      console.error("Error creating carrera:", error);
      throw error;
    }
  }

  async updateCarrera(id, data) {
    try {
      const carrera = await this.getCarrera(id);
      await carrera.update(data);
      return carrera;
    } catch (error) {
      console.error("Error updating carrera:", error);
      throw error;
    }
  }

  async deleteCarrera(id) {
    try {
      const carrera = await this.getCarrera(id);
      await carrera.destroy();
      return { message: "Carrera deleted successfully" };
    } catch (error) {
      console.error("Error deleting carrera:", error);
      throw error;
    }
  }
}

module.exports = servicesCarrera;
