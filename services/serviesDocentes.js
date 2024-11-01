const Docente = require("../models/Docente");
const sequelize = require("../libs/dbConexionORM");
const { Horario, Materia, HorarioMateria } = require("../models");

class servicesDocente {
  // Método GET para obtener todos los docentes
  async getAllDocentes() {
    try {
      const docentes = await Docente.findAll({
        include: {
          model: HorarioMateria,
          as: "horarioMaterias",
          include: [
            {
              model: Horario,
              as: "horario",
            },
            {
              model: Materia,
              as: "materia",
            },
          ],
        },
      });
      return docentes;
    } catch (error) {
      console.error("Error fetching all docentes:", error);
      throw error;
    }
  }

  async getDocenteMateriasHorarios(id_docente) {
    try {
      const docente = await Docente.findAll({
        include: {
          model: Materia,
          as: "materias",
          include: {
            model: Horario,
            as: "horarios",
          },
        },
      });
      return docente;
    } catch (error) {
      console.error(
        "Error fetching docente with materias and horarios:",
        error
      );
      throw error;
    }
  }

  // Método GET para obtener un docente por ID
  async getDocenteById(id) {
    try {
      const docente = await Docente.findByPk(id);
      if (!docente) {
        throw new Error(`Docente with ID ${id} not found`);
      }
      return docente;
    } catch (error) {
      console.error("Error fetching docente by ID:", error);
      throw error;
    }
  }

  // Método POST para crear un nuevo docente
  async createDocente(data) {
    const { nombre, apellido, email, telefono, especialidad, horarios } = data;
    const transaction = await sequelize.transaction();

    try {
      const newDocente = await Docente.create(
        { nombre, apellido, email, telefono, especialidad },
        { transaction }
      );

      if (horarios && horarios.length > 0) {
        for (const { id_horario, id_materia } of horarios) {
          await HorarioMateria.update(
            { id_docente: newDocente.id_docente },
            {
              where: { id_horario, id_materia },
              transaction,
            }
          );
        }
      }
      await transaction.commit();

      return newDocente;
    } catch (error) {
      await transaction.rollback();
      console.error("Error creating docente:", error);
      throw error;
    }
  }

  // Método PUT para actualizar un docente por ID
  async updateDocente(id, data) {
    try {
      const docente = await Docente.findByPk(id);
      if (!docente) {
        throw new Error(`Docente with ID ${id} not found`);
      }
      await docente.update(data);
      return docente;
    } catch (error) {
      console.error("Error updating docente:", error);
      throw error;
    }
  }

  // Método DELETE para eliminar un docente por ID
  async deleteDocente(id) {
    try {
      const docente = await Docente.findByPk(id);
      if (!docente) {
        throw new Error(`Docente with ID ${id} not found`);
      }
      await docente.destroy();
      return { message: "Docente deleted successfully" };
    } catch (error) {
      console.error("Error deleting docente:", error);
      throw error;
    }
  }
}

module.exports = servicesDocente;
