const express = require("express");
const HorarioService = require("../services/servicesHorario");
const route = express.Router();

const horarioService = new HorarioService();

// Ruta GET para obtener todos los horarios
route.get("/", async (req, res) => {
  try {
    const horarios = await horarioService.getAllHorarios();
    res.json(horarios);
  } catch (error) {
    console.error("Error fetching horarios:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta GET para obtener un horario por ID
route.get("/:id", async (req, res) => {
  try {
    const horario = await horarioService.getHorarioById(req.params.id);
    res.json(horario);
  } catch (error) {
    console.error("Error fetching horario by ID:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta POST para crear un nuevo horario
route.post("/", async (req, res) => {
  try {
    const newHorario = await horarioService.createHorario(req.body);
    res.status(201).json(newHorario);
  } catch (error) {
    console.error("Error creating horario:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta PUT para actualizar un horario por ID
route.put("/:id", async (req, res) => {
  try {
    const updatedHorario = await horarioService.updateHorario(
      req.params.id,
      req.body
    );
    res.json(updatedHorario);
  } catch (error) {
    console.error("Error updating horario:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta DELETE para eliminar un horario por ID
route.delete("/:id", async (req, res) => {
  try {
    const message = await horarioService.deleteHorario(req.params.id);
    res.json(message);
  } catch (error) {
    console.error("Error deleting horario:", error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = route;
