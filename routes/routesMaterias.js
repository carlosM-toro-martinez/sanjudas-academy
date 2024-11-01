const express = require("express");
const MateriaService = require("../services/servicesMateria");
const route = express.Router();

const materiaService = new MateriaService();

route.get("/materias", async (req, res) => {
  try {
    const materias = await materiaService.getAllMaterias();
    res.json(materias);
  } catch (error) {
    console.error("Error fetching materias:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta GET para obtener todas las materias
route.get("/", async (req, res) => {
  try {
    const materias = await materiaService.getAllHorarioMaterias();
    res.json(materias);
  } catch (error) {
    console.error("Error fetching materias:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta GET para obtener una materia por ID
route.get("/:id", async (req, res) => {
  try {
    const materia = await materiaService.getMateriaById(req.params.id);
    res.json(materia);
  } catch (error) {
    console.error("Error fetching materia by ID:", error);
    res.status(404).json({ error: error.message });
  }
});

route.get("/materias-estudiantes", async (req, res) => {
  try {
    const materias =
      await materiaService.getMateriasCantidadEstudiantesPorHorario();
    res.status(200).json(materias);
  } catch (error) {
    console.error(
      "Error fetching materias with student counts by horario:",
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta POST para crear una nueva materia
route.post("/", async (req, res) => {
  try {
    const { nombre, descripcion, horarios } = req.body;

    if (!nombre || !horarios || horarios.length === 0) {
      return res
        .status(400)
        .json({ error: "Nombre y horarios son requeridos" });
    }

    const newMateria = await materiaService.createMateria({
      nombre,
      descripcion,
      horarios,
    });

    res.status(201).json(newMateria);
  } catch (error) {
    console.error("Error creating materia:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta PUT para actualizar una materia por ID
route.put("/:id", async (req, res) => {
  try {
    const updatedMateria = await materiaService.updateMateria(
      req.params.id,
      req.body
    );
    res.json(updatedMateria);
  } catch (error) {
    console.error("Error updating materia:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta DELETE para eliminar una materia por ID
route.delete("/:id", async (req, res) => {
  try {
    const message = await materiaService.deleteMateria(req.params.id);
    res.json(message);
  } catch (error) {
    console.error("Error deleting materia:", error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = route;
