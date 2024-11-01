const Estudiante = require("../models/Estudiante");
const sequelize = require("../libs/dbConexionORM");
const {
  Horario,
  Materia,
  EstudianteHorarioMateria,
  HorarioMateria,
} = require("../models");

class servicesEstudiante {
  async getAllEstudiantes() {
    try {
      const estudiantes = await Estudiante.findAll({
        include: {
          model: HorarioMateria,
          as: "horariosMateria",
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
      return estudiantes;
    } catch (error) {
      console.error("Error fetching all estudiantes:", error);
      throw error;
    }
  }

  // Método GET para obtener un estudiante por ID
  async getEstudianteById(id) {
    try {
      const estudiante = await Estudiante.findByPk(id);
      if (!estudiante) {
        throw new Error(`Estudiante with ID ${id} not found`);
      }
      return estudiante;
    } catch (error) {
      console.error("Error fetching estudiante by ID:", error);
      throw error;
    }
  }

  // Método POST para crear un nuevo estudiante
  async createEstudiante(data) {
    const transaction = await sequelize.transaction();

    try {
      const newEstudiante = await Estudiante.create(data, { transaction });

      const estudianteHorarios = data.horariosMateria.map(
        (id_horario_materia) => ({
          id_estudiante: newEstudiante.id_estudiante,
          id_horario_materia,
        })
      );

      await EstudianteHorarioMateria.bulkCreate(estudianteHorarios, {
        transaction,
      });

      await transaction.commit();

      return newEstudiante;
    } catch (error) {
      await transaction.rollback();
      console.error("Error creating estudiante:", error);
      throw error;
    }
  }

  // Método PUT para actualizar un estudiante por ID
  async updateEstudiante(id, data) {
    try {
      const estudiante = await Estudiante.findByPk(id);
      if (!estudiante) {
        throw new Error(`Estudiante with ID ${id} not found`);
      }
      await estudiante.update(data);
      return estudiante;
    } catch (error) {
      console.error("Error updating estudiante:", error);
      throw error;
    }
  }

  // Método DELETE para eliminar un estudiante por ID
  async deleteEstudiante(id) {
    try {
      const estudiante = await Estudiante.findByPk(id);
      if (!estudiante) {
        throw new Error(`Estudiante with ID ${id} not found`);
      }
      await estudiante.destroy();
      return { message: "Estudiante deleted successfully" };
    } catch (error) {
      console.error("Error deleting estudiante:", error);
      throw error;
    }
  }
}

module.exports = servicesEstudiante;
