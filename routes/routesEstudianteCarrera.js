const express = require("express");
const servicesEstudianteCarrera = require("../services/servicesEstudianteCarrera");
const router = express.Router();
const estudianteCarreraService = new servicesEstudianteCarrera();

// Ruta GET para obtener todos los estudiantes de carrera
router.get("/", async (req, res) => {
  try {
    const estudiantes =
      await estudianteCarreraService.getAllEstudiantesCarrera();
    res.json(estudiantes);
  } catch (error) {
    console.error("Error fetching estudiantes carrera:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta GET para obtener un estudiante de carrera por id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const estudiante = await estudianteCarreraService.getEstudianteCarrera(id);
    res.json(estudiante);
  } catch (error) {
    console.error("Error fetching estudiante carrera:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta POST para crear un nuevo estudiante de carrera
router.post("/", async (req, res) => {
  try {
    const newEstudiante =
      await estudianteCarreraService.createEstudianteCarrera(req.body);
    res.status(201).json(newEstudiante);
  } catch (error) {
    console.error("Error creating estudiante carrera:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta PUT para actualizar un estudiante de carrera por id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEstudiante =
      await estudianteCarreraService.updateEstudianteCarrera(id, req.body);
    res.json(updatedEstudiante);
  } catch (error) {
    console.error("Error updating estudiante carrera:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta DELETE para eliminar un estudiante de carrera por id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const message = await estudianteCarreraService.deleteEstudianteCarrera(id);
    res.json(message);
  } catch (error) {
    console.error("Error deleting estudiante carrera:", error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
