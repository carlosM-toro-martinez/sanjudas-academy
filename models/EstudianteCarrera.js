const { Model, DataTypes } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");

class EstudianteCarrera extends Model {}

EstudianteCarrera.init(
  {
    id_estudiante_carrera: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    carnet_identidad: { type: DataTypes.STRING, unique: true },
    gestion: DataTypes.STRING,
    id_carrera: {
      type: DataTypes.INTEGER,
      references: { model: "Carrera", key: "id_carrera" },
    },
    nivel: DataTypes.STRING,
    turno: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido_paterno: DataTypes.STRING,
    apellido_materno: DataTypes.STRING,
    domicilio: DataTypes.STRING,
    correo: DataTypes.STRING,
    celular: DataTypes.STRING,
    anio_egreso: DataTypes.INTEGER,
    colegio: DataTypes.STRING,
    apoderado_nombre: DataTypes.STRING,
    apoderado_apellido: DataTypes.STRING,
    estado_civil: DataTypes.STRING,
    sexo: DataTypes.STRING,
    numero_apoderado: DataTypes.STRING,
    numero_diploma: DataTypes.STRING,
    foto: DataTypes.STRING,
    fecha_inscripcion: DataTypes.DATE,
    ru: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "EstudianteCarrera",
    tableName: "EstudianteCarrera",
    timestamps: false,
  }
);
module.exports = EstudianteCarrera;
