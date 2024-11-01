const express = require("express");
const EstudianteService = require("../services/servicesEstudiante");
const route = express.Router();

const estudianteService = new EstudianteService();

// Ruta GET para obtener todos los estudiantes
route.get("/", async (req, res) => {
  try {
    const estudiantes = await estudianteService.getAllEstudiantes();
    res.json(estudiantes);
  } catch (error) {
    console.error("Error fetching estudiantes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta GET para obtener un estudiante por ID
route.get("/:id", async (req, res) => {
  try {
    const estudiante = await estudianteService.getEstudianteById(req.params.id);
    res.json(estudiante);
  } catch (error) {
    console.error("Error fetching estudiante by ID:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta POST para crear un nuevo estudiante
route.post("/", async (req, res) => {
  try {
    const newEstudiante = await estudianteService.createEstudiante(req.body);
    res.status(201).json(newEstudiante);
  } catch (error) {
    console.error("Error creating estudiante:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta PUT para actualizar un estudiante por ID
route.put("/:id", async (req, res) => {
  try {
    const updatedEstudiante = await estudianteService.updateEstudiante(
      req.params.id,
      req.body
    );
    res.json(updatedEstudiante);
  } catch (error) {
    console.error("Error updating estudiante:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta DELETE para eliminar un estudiante por ID
route.delete("/:id", async (req, res) => {
  try {
    const message = await estudianteService.deleteEstudiante(req.params.id);
    res.json(message);
  } catch (error) {
    console.error("Error deleting estudiante:", error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = route;
