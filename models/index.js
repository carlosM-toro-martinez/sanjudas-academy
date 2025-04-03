const { Sequelize } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");

const Rol = require("./Rol");
const Permiso = require("./Permiso");
const RolPermiso = require("./RolPermiso");
const Administrador = require("./Administrador");
const Proveedor = require("./Proveedor");
const Producto = require("./Producto");
const Cliente = require("./Cliente");
const Trabajador = require("./Trabajador");
const DetalleCompra = require("./DetalleCompra");
const Lote = require("./Lote");
const Inventario = require("./Inventario");
const Venta = require("./Venta");
const DetalleVenta = require("./DetalleVenta");
const MovimientoInventario = require("./MovimientoInventario");
const Caja = require("./Caja");
const MovimientoCaja = require("./MovimientoCaja");
const DenominacionCaja = require("./DenominacionCaja");
const Reporte = require("./Reporte");
const Categoria = require("./Categoria");
const MetodoVenta = require("./MetodoVenta");
const Garantia = require("./Garantia");
const Estudiante = require("./Estudiante");
const Horario = require("./Horario");
const Docente = require("./Docente");
const Materia = require("./Materia");
const HorarioMateria = require("./HorarioMateria");
const EstudianteHorarioMateria = require("./EstudianteHorarioMateria");
const Carrera = require("./Carrera");
const MateriaCarrera = require("./MateriaCarrera");
const Ambiente = require("./Ambiente");
const EstudianteCarrera = require("./EstudianteCarrera");
const InscripcionMateria = require("./InscripcionMateria");
const PagoMensualidad = require("./PagoMensualidad");

EstudianteCarrera.hasMany(PagoMensualidad, {
  foreignKey: "id_estudiante_carrera",
  sourceKey: "id_estudiante_carrera",
  as: "estudianteMensualidad",
});
PagoMensualidad.belongsTo(EstudianteCarrera, {
  foreignKey: "id_estudiante_carrera",
  targetKey: "id_estudiante_carrera",
  as: "estudianteMensualidad",
});

// // Definir las relaciones
// Estudiante.hasMany(EstudianteHorarioMateria, {
//   foreignKey: "id_estudiante",
//   onDelete: "CASCADE",
//   as: "horariosEstudiante",
// });

// HorarioMateria.hasMany(EstudianteHorarioMateria, {
//   foreignKey: "id_horario",
//   onDelete: "CASCADE",
//   as: "estudiantesHorario",
// });

// EstudianteHorarioMateria.belongsTo(Estudiante, {
//   foreignKey: "id_estudiante",
//   as: "estudiante", // Alias único para la relación inversa
// });

// EstudianteHorarioMateria.belongsTo(HorarioMateria, {
//   foreignKey: "id_horario",
//   as: "horario", // Alias único para la relación inversa
// });

Carrera.hasMany(MateriaCarrera, {
  foreignKey: "id_carrera",
  as: "materiasCarrera",
});
MateriaCarrera.belongsTo(Carrera, { foreignKey: "id_carrera", as: "carrera" });

EstudianteCarrera.belongsTo(Carrera, {
  foreignKey: "id_carrera",
  as: "carrera",
});
Carrera.hasMany(EstudianteCarrera, {
  foreignKey: "id_carrera",
  as: "estudiantesCarrera",
});

InscripcionMateria.belongsTo(EstudianteCarrera, {
  foreignKey: "id_estudiante_carrera",
  as: "estudiantesCarrera",
});
InscripcionMateria.belongsTo(MateriaCarrera, {
  foreignKey: "id_materia_carrera",
  as: "materiaCarrera",
});
InscripcionMateria.belongsTo(Ambiente, {
  foreignKey: "id_ambiente",
  as: "ambiente",
});

EstudianteCarrera.hasMany(InscripcionMateria, {
  foreignKey: "id_estudiante_carrera",
  as: "inscripciones",
});
MateriaCarrera.hasMany(InscripcionMateria, {
  foreignKey: "id_materia_carrera",
  as: "inscripciones",
});
Ambiente.hasMany(InscripcionMateria, {
  foreignKey: "id_ambiente",
  as: "inscripciones",
});

// Asociación de Docente y Materia (Uno a Muchos)
Docente.hasMany(HorarioMateria, {
  foreignKey: "id_docente",
  as: "horarioMaterias",
});
HorarioMateria.belongsTo(Docente, {
  foreignKey: "id_docente",
  as: "docente",
});

// Horario - Materia (Muchos a Muchos)
Materia.belongsToMany(Horario, {
  through: HorarioMateria,
  foreignKey: "id_materia",
  otherKey: "id_horario",
  as: "horarios",
});
Horario.belongsToMany(Materia, {
  through: HorarioMateria,
  foreignKey: "id_horario",
  otherKey: "id_materia",
  as: "materias",
});

// Asociación entre HorarioMateria y Materia (Muchos a Uno)
HorarioMateria.belongsTo(Materia, {
  foreignKey: "id_materia",
  as: "materia",
});
Materia.hasMany(HorarioMateria, {
  foreignKey: "id_materia",
  as: "horariosMateria",
});

// Asociación entre HorarioMateria y Horario (Muchos a Uno)
HorarioMateria.belongsTo(Horario, {
  foreignKey: "id_horario",
  as: "horario",
});
Horario.hasMany(HorarioMateria, {
  foreignKey: "id_horario",
  as: "horariosMateria",
});

// Relación muchos a muchos entre Estudiante y HorarioMateria a través de EstudianteHorarioMateria
Estudiante.belongsToMany(HorarioMateria, {
  through: EstudianteHorarioMateria,
  foreignKey: "id_estudiante",
  otherKey: "id_horario_materia",
  as: "horariosMateria",
});

HorarioMateria.belongsToMany(Estudiante, {
  through: EstudianteHorarioMateria,
  foreignKey: "id_horario_materia",
  otherKey: "id_estudiante",
  as: "estudiantes",
});

// Asociación DetalleVenta -> Lote
DetalleVenta.belongsTo(Lote, {
  foreignKey: "id_lote",
  as: "lote",
});

// Asociación Lote -> DetalleVenta
Lote.hasMany(DetalleVenta, {
  foreignKey: "id_lote",
  as: "detallesVenta",
});

// Relación Garantia con Cliente
Cliente.hasMany(Garantia, {
  foreignKey: "id_cliente",
  as: "garantias",
});
Garantia.belongsTo(Cliente, {
  foreignKey: "id_cliente",
  as: "cliente",
});

// Relación Garantia con Venta
Venta.hasMany(Garantia, {
  foreignKey: "id_venta",
  as: "garantias",
});
Garantia.belongsTo(Venta, {
  foreignKey: "id_venta",
  as: "venta",
});

// Asociación de Producto y MetodoVenta (Uno a Muchos)
Producto.hasMany(MetodoVenta, {
  foreignKey: "id_producto",
  as: "metodosVenta",
});
MetodoVenta.belongsTo(Producto, {
  foreignKey: "id_producto",
  as: "producto",
});

// Rol - Permiso (Muchos a Muchos)
Rol.belongsToMany(Permiso, {
  through: RolPermiso,
  foreignKey: "id_rol",
  otherKey: "id_permiso",
  as: "permisos",
});
Permiso.belongsToMany(Rol, {
  through: RolPermiso,
  foreignKey: "id_permiso",
  otherKey: "id_rol",
  as: "roles",
});

// Trabajador - Rol (Uno a Muchos)
Trabajador.belongsTo(Rol, {
  foreignKey: "id_rol",
  as: "rol",
});
Rol.hasMany(Trabajador, {
  foreignKey: "id_rol",
  as: "trabajadores",
});

// Inventario - Producto
Inventario.belongsTo(Producto, {
  foreignKey: "id_producto",
  as: "producto",
});
Producto.hasMany(Inventario, {
  foreignKey: "id_producto",
  as: "inventarios",
});

// Inventario - Lote
Inventario.belongsTo(Lote, {
  foreignKey: "id_lote",
  as: "lote",
});
Lote.hasMany(Inventario, {
  foreignKey: "id_lote",
  as: "inventarios",
});

// Lote - Producto
Lote.belongsTo(Producto, { foreignKey: "id_producto", as: "producto" });
Producto.hasMany(Lote, { foreignKey: "id_producto", as: "lotes" });

// DetalleCompra - Producto
DetalleCompra.belongsTo(Producto, {
  foreignKey: "id_producto",
  as: "producto",
});
Producto.hasMany(DetalleCompra, {
  foreignKey: "id_producto",
  as: "detallesCompra",
});

// DetalleCompra - Proveedor
DetalleCompra.belongsTo(Proveedor, {
  foreignKey: "id_proveedor",
  as: "proveedor",
});
Proveedor.hasMany(DetalleCompra, {
  foreignKey: "id_proveedor",
  as: "detallesCompra",
});

// Lote - DetalleCompra
Lote.belongsTo(DetalleCompra, {
  foreignKey: "id_detalle_compra",
  as: "detalleCompra",
});
DetalleCompra.hasMany(Lote, { foreignKey: "id_detalle_compra", as: "lotes" });

// Caja - Trabajador
Caja.belongsTo(Trabajador, {
  foreignKey: "id_trabajador",
  as: "trabajadorCierre",
});
Trabajador.hasMany(Caja, {
  foreignKey: "id_trabajador",
  as: "cajasCierre",
});

// MovimientoCaja - Caja
MovimientoCaja.belongsTo(Caja, {
  foreignKey: "id_caja",
  as: "caja",
});
Caja.hasMany(MovimientoCaja, {
  foreignKey: "id_caja",
  as: "movimientos",
});

// MovimientoCaja - Trabajador
MovimientoCaja.belongsTo(Trabajador, {
  foreignKey: "id_trabajador",
  as: "trabajadorMovimiento",
});
Trabajador.hasMany(MovimientoCaja, {
  foreignKey: "id_trabajador",
  as: "movimientosRealizados",
});

// DenominacionCaja - Caja
DenominacionCaja.belongsTo(Caja, {
  foreignKey: "id_caja",
  as: "cajaDenominacion",
});
Caja.hasMany(DenominacionCaja, {
  foreignKey: "id_caja",
  as: "denominaciones",
});

// Categoria - Producto (Uno a Muchos)
Categoria.hasMany(Producto, {
  foreignKey: "id_categoria",
  as: "productos",
});
Producto.belongsTo(Categoria, {
  foreignKey: "id_categoria",
  as: "categoria",
});

// Nuevas asociaciones

// MovimientoInventario - Producto (Muchos a Uno)
MovimientoInventario.belongsTo(Producto, {
  foreignKey: "id_producto",
  as: "producto",
});
Producto.hasMany(MovimientoInventario, {
  foreignKey: "id_producto",
  as: "movimientosInventario",
});

// MovimientoInventario - Trabajador (Muchos a Uno)
MovimientoInventario.belongsTo(Trabajador, {
  foreignKey: "id_trabajador",
  as: "trabajadorMovimientoInventario",
});
Trabajador.hasMany(MovimientoInventario, {
  foreignKey: "id_trabajador",
  as: "movimientosInventarioRealizados",
});

// DetalleCompra - Trabajador (Muchos a Uno)
DetalleCompra.belongsTo(Trabajador, {
  foreignKey: "id_trabajador",
  as: "trabajadorCompra",
});
Trabajador.hasMany(DetalleCompra, {
  foreignKey: "id_trabajador",
  as: "detallesCompraRealizados",
});

// Venta - Trabajador (Muchos a Uno)
Venta.belongsTo(Trabajador, {
  foreignKey: "id_trabajador",
  as: "trabajadorVenta",
});
Trabajador.hasMany(Venta, {
  foreignKey: "id_trabajador",
  as: "ventasRealizadas",
});

// Venta - Producto (Uno a Muchos a través de DetalleVenta)
Venta.hasMany(DetalleVenta, {
  foreignKey: "id_venta",
  as: "detallesVenta",
});
DetalleVenta.belongsTo(Venta, {
  foreignKey: "id_venta",
  as: "venta",
});
DetalleVenta.belongsTo(Producto, {
  foreignKey: "id_producto",
  as: "producto",
});
Producto.hasMany(DetalleVenta, {
  foreignKey: "id_producto",
  as: "detallesVenta",
});

// Cliente - Venta (Uno a Muchos)
Cliente.hasMany(Venta, {
  foreignKey: "id_cliente",
  as: "ventas",
});
Venta.belongsTo(Cliente, {
  foreignKey: "id_cliente",
  as: "cliente",
});

module.exports = {
  sequelize,
  Rol,
  Permiso,
  RolPermiso,
  Administrador,
  Proveedor,
  Producto,
  Cliente,
  Trabajador,
  DetalleCompra,
  Lote,
  Inventario,
  Venta,
  DetalleVenta,
  MovimientoInventario,
  Caja,
  MovimientoCaja,
  DenominacionCaja,
  Reporte,
  Categoria,
  MetodoVenta,
  Estudiante,
  Horario,
  Docente,
  Materia,
  HorarioMateria,
  EstudianteHorarioMateria,
  Carrera,
  MateriaCarrera,
  Ambiente,
  EstudianteCarrera,
  InscripcionMateria,
  Garantia,
};
