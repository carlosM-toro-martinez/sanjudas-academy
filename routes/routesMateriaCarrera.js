const express = require("express");
const servicesMateriaCarrera = require("../services/servicesMateriaCarrera");
const router = express.Router();
const materiaCarreraService = new servicesMateriaCarrera();

// Ruta GET para obtener todas las materias de carrera
router.get("/", async (req, res) => {
  try {
    const materias = await materiaCarreraService.getAllMateriaCarreras();
    res.json(materias);
  } catch (error) {
    console.error("Error fetching materia carrera:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta GET para obtener una materia de carrera por id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const materia = await materiaCarreraService.getMateriaCarrera(id);
    res.json(materia);
  } catch (error) {
    console.error("Error fetching materia carrera:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta POST para crear una nueva materia de carrera
router.post("/", async (req, res) => {
  try {
    const newMateria = await materiaCarreraService.createMateriaCarrera(
      req.body
    );
    res.status(201).json(newMateria);
  } catch (error) {
    console.error("Error creating materia carrera:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta PUT para actualizar una materia de carrera por id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMateria = await materiaCarreraService.updateMateriaCarrera(
      id,
      req.body
    );
    res.json(updatedMateria);
  } catch (error) {
    console.error("Error updating materia carrera:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta DELETE para eliminar una materia de carrera por id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const message = await materiaCarreraService.deleteMateriaCarrera(id);
    res.json(message);
  } catch (error) {
    console.error("Error deleting materia carrera:", error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
