const express = require("express");
const servicesCarrera = require("../services/servicesCarrera");
const router = express.Router();
const carreraService = new servicesCarrera();

// Ruta GET para obtener todas las carreras
router.get("/", async (req, res) => {
  try {
    const carreras = await carreraService.getAllCarreras();
    res.json(carreras);
  } catch (error) {
    console.error("Error fetching carreras:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta GET para obtener una carrera por id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const carrera = await carreraService.getCarrera(id);
    res.json(carrera);
  } catch (error) {
    console.error("Error fetching carrera:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta POST para crear una nueva carrera
router.post("/", async (req, res) => {
  try {
    const newCarrera = await carreraService.createCarrera(req.body);
    res.status(201).json(newCarrera);
  } catch (error) {
    console.error("Error creating carrera:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta PUT para actualizar una carrera por id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCarrera = await carreraService.updateCarrera(id, req.body);
    res.json(updatedCarrera);
  } catch (error) {
    console.error("Error updating carrera:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta DELETE para eliminar una carrera por id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const message = await carreraService.deleteCarrera(id);
    res.json(message);
  } catch (error) {
    console.error("Error deleting carrera:", error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
