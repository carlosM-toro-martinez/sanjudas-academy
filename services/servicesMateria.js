const Materia = require("../models/Materia");
const sequelize = require("../libs/dbConexionORM");
const { Horario, HorarioMateria, Docente } = require("../models");

class servicesMateria {
  async getAllMaterias() {
    try {
      const materias = await Materia.findAll();
      return materias;
    } catch (error) {
      console.error("Error fetching all HorarioMaterias:", error);
      throw error;
    }
  }
  // Método GET para obtener todas las materias
  async getAllHorarioMaterias() {
    try {
      const horarioMaterias = await HorarioMateria.findAll({
        include: [
          {
            model: Materia,
            as: "materia",
          },
          {
            model: Horario,
            as: "horario",
          },
          {
            model: Docente,
            as: "docente",
          },
        ],
      });
      return horarioMaterias;
    } catch (error) {
      console.error("Error fetching all HorarioMaterias:", error);
      throw error;
    }
  }

  // Método GET para obtener una materia por ID
  async getMateriaById(id) {
    try {
      const materia = await Materia.findByPk(id);
      if (!materia) {
        throw new Error(`Materia with ID ${id} not found`);
      }
      return materia;
    } catch (error) {
      console.error("Error fetching materia by ID:", error);
      throw error;
    }
  }

  async getMateriasCantidadEstudiantesPorHorario() {
    try {
      const materias = await Materia.findAll({
        include: {
          model: Horario,
          as: "horarios",
          include: {
            model: Estudiante,
            as: "estudiantes",
            attributes: [
              [
                sequelize.fn("COUNT", sequelize.col("id_estudiante")),
                "cantidad",
              ],
            ],
            group: ["Horario.id_horario"],
          },
        },
      });
      return materias;
    } catch (error) {
      console.error(
        "Error fetching materias with student counts by horario:",
        error
      );
      throw error;
    }
  }

  async createMateria(data) {
    const { nombre, descripcion, horarios } = data;
    const transaction = await Materia.sequelize.transaction();

    try {
      const newMateria = await Materia.create(
        { nombre, descripcion },
        { transaction }
      );

      if (horarios && horarios.length > 0) {
        for (const id_horario of horarios) {
          await HorarioMateria.create(
            {
              id_materia: newMateria.id_materia,
              id_horario,
            },
            { transaction }
          );
        }
      }
      await transaction.commit();
      return newMateria;
    } catch (error) {
      await transaction.rollback();
      console.error("Error creating materia:", error);
      throw error;
    }
  }

  // Método PUT para actualizar una materia por ID
  async updateMateria(id, data) {
    try {
      const materia = await HorarioMateria.findByPk(id);
      if (!materia) {
        throw new Error(`Materia with ID ${id} not found`);
      }
      await materia.update(data);
      return materia;
    } catch (error) {
      console.error("Error updating materia:", error);
      throw error;
    }
  }

  // Método DELETE para eliminar una materia por ID
  async deleteMateria(id) {
    try {
      const materia = await Materia.findByPk(id);
      if (!materia) {
        throw new Error(`Materia with ID ${id} not found`);
      }
      await materia.destroy();
      return { message: "Materia deleted successfully" };
    } catch (error) {
      console.error("Error deleting materia:", error);
      throw error;
    }
  }
}

module.exports = servicesMateria;
