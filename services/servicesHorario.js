const Horario = require("../models/Horario");
const sequelize = require("../libs/dbConexionORM");

class servicesHorario {
  // Método GET para obtener todos los horarios
  async getAllHorarios() {
    try {
      const horarios = await Horario.findAll();
      return horarios;
    } catch (error) {
      console.error("Error fetching all horarios:", error);
      throw error;
    }
  }

  // Método GET para obtener un horario por ID
  async getHorarioById(id) {
    try {
      const horario = await Horario.findByPk(id);
      if (!horario) {
        throw new Error(`Horario with ID ${id} not found`);
      }
      return horario;
    } catch (error) {
      console.error("Error fetching horario by ID:", error);
      throw error;
    }
  }

  // Método POST para crear un nuevo horario
  async createHorario(data) {
    try {
      const newHorario = await Horario.create(data);
      return newHorario;
    } catch (error) {
      console.error("Error creating horario:", error);
      throw error;
    }
  }

  // Método PUT para actualizar un horario por ID
  async updateHorario(id, data) {
    try {
      const horario = await Horario.findByPk(id);
      if (!horario) {
        throw new Error(`Horario with ID ${id} not found`);
      }
      await horario.update(data);
      return horario;
    } catch (error) {
      console.error("Error updating horario:", error);
      throw error;
    }
  }

  // Método DELETE para eliminar un horario por ID
  async deleteHorario(id) {
    try {
      const horario = await Horario.findByPk(id);
      if (!horario) {
        throw new Error(`Horario with ID ${id} not found`);
      }
      await horario.destroy();
      return { message: "Horario deleted successfully" };
    } catch (error) {
      console.error("Error deleting horario:", error);
      throw error;
    }
  }
}

module.exports = servicesHorario;
