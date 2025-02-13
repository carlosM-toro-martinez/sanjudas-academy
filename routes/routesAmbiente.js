const express = require("express");
const servicesAmbiente = require("../services/servicesAmbiente");
const router = express.Router();
const ambienteService = new servicesAmbiente();

// Ruta GET para obtener todos los ambientes
router.get("/", async (req, res) => {
  try {
    const ambientes = await ambienteService.getAllAmbientes();
    res.json(ambientes);
  } catch (error) {
    console.error("Error fetching ambientes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta GET para obtener un ambiente por id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ambiente = await ambienteService.getAmbiente(id);
    res.json(ambiente);
  } catch (error) {
    console.error("Error fetching ambiente:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta POST para crear un nuevo ambiente
router.post("/", async (req, res) => {
  try {
    const newAmbiente = await ambienteService.createAmbiente(req.body);
    res.status(201).json(newAmbiente);
  } catch (error) {
    console.error("Error creating ambiente:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta PUT para actualizar un ambiente por id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAmbiente = await ambienteService.updateAmbiente(id, req.body);
    res.json(updatedAmbiente);
  } catch (error) {
    console.error("Error updating ambiente:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta DELETE para eliminar un ambiente por id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const message = await ambienteService.deleteAmbiente(id);
    res.json(message);
  } catch (error) {
    console.error("Error deleting ambiente:", error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
