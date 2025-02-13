const Ambiente = require("../models/Ambiente");

class servicesAmbiente {
  constructor() {
    this.sesion = {};
  }

  async getAllAmbientes() {
    try {
      const ambientes = await Ambiente.findAll();
      return ambientes;
    } catch (error) {
      console.error("Error fetching all ambientes:", error);
      throw error;
    }
  }

  async getAmbiente(id) {
    try {
      const ambiente = await Ambiente.findByPk(id);
      if (!ambiente) {
        throw new Error(`Ambiente with ID ${id} not found`);
      }
      return ambiente;
    } catch (error) {
      console.error("Error fetching ambiente:", error);
      throw error;
    }
  }

  async createAmbiente(data) {
    try {
      const newAmbiente = await Ambiente.create(data);
      return newAmbiente;
    } catch (error) {
      console.error("Error creating ambiente:", error);
      throw error;
    }
  }

  async updateAmbiente(id, data) {
    try {
      const ambiente = await this.getAmbiente(id);
      await ambiente.update(data);
      return ambiente;
    } catch (error) {
      console.error("Error updating ambiente:", error);
      throw error;
    }
  }

  async deleteAmbiente(id) {
    try {
      const ambiente = await this.getAmbiente(id);
      await ambiente.destroy();
      return { message: "Ambiente deleted successfully" };
    } catch (error) {
      console.error("Error deleting ambiente:", error);
      throw error;
    }
  }
}

module.exports = servicesAmbiente;
