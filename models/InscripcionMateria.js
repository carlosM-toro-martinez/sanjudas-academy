const { Model, DataTypes } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");
const EstudianteCarrera = require("./EstudianteCarrera");
const MateriaCarrera = require("./MateriaCarrera");
const Ambiente = require("./Ambiente");

class InscripcionMateria extends Model {}
InscripcionMateria.init(
  {
    id_inscripcion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_estudiante_carrera: {
      type: DataTypes.INTEGER,
      references: { model: EstudianteCarrera, key: "id_estudiante_carrera" },
    },
    id_materia_carrera: {
      type: DataTypes.INTEGER,
      references: { model: MateriaCarrera, key: "id_materia_carrera" },
    },
    id_ambiente: {
      type: DataTypes.INTEGER,
      references: { model: Ambiente, key: "id_ambiente" },
    },
    estado: DataTypes.ENUM("Cursando", "Aprobado", "Reprobado", "Pendiente"),
  },
  {
    sequelize,
    modelName: "InscripcionMateria",
    tableName: "InscripcionMateria",
    timestamps: false,
  }
);
module.exports = InscripcionMateria;
