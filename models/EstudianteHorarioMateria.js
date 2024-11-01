const { Model, DataTypes } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");

class EstudianteHorarioMateria extends Model {}

EstudianteHorarioMateria.init(
  {
    id_estudiante: {
      type: DataTypes.INTEGER,
      references: {
        model: "Estudiante",
        key: "id_estudiante",
      },
      allowNull: false,
      primaryKey: true,
    },
    id_horario_materia: {
      type: DataTypes.INTEGER,
      references: {
        model: "HorarioMateria",
        key: "id_horario_materia",
      },
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "EstudianteHorarioMateria",
    tableName: "EstudianteHorarioMateria",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["id_horario_materia", "id_estudiante"],
      },
    ],
  }
);

module.exports = EstudianteHorarioMateria;
