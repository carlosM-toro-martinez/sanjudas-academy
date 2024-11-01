const express = require("express");
const DocenteService = require("../services/serviesDocentes");
const route = express.Router();

const docenteService = new DocenteService();

// Ruta GET para obtener todos los docentes
route.get("/", async (req, res) => {
  try {
    const docentes = await docenteService.getAllDocentes();
    res.json(docentes);
  } catch (error) {
    console.error("Error fetching docentes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta GET para obtener un docente por ID
route.get("/:id", async (req, res) => {
  try {
    const docente = await docenteService.getDocenteById(req.params.id);
    res.json(docente);
  } catch (error) {
    console.error("Error fetching docente by ID:", error);
    res.status(404).json({ error: error.message });
  }
});

route.get("/docente/:id_docente", async (req, res) => {
  try {
    const docente = await docenteService.getDocenteMateriasHorarios(
      req.params.id_docente
    );
    res.status(200).json(docente);
  } catch (error) {
    console.error("Error fetching docente with materias and horarios:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.post("/", async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, especialidad, horarios } =
      req.body;

    if (!nombre || !apellido || !email || !horarios || horarios.length === 0) {
      return res
        .status(400)
        .json({ error: "Nombre, apellido, email y horarios son requeridos" });
    }

    const newDocente = await docenteService.createDocente({
      nombre,
      apellido,
      email,
      telefono,
      especialidad,
      horarios,
    });

    res.status(201).json(newDocente);
  } catch (error) {
    console.error("Error creating docente:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta PUT para actualizar un docente por ID
route.put("/:id", async (req, res) => {
  try {
    const updatedDocente = await docenteService.updateDocente(
      req.params.id,
      req.body
    );
    res.json(updatedDocente);
  } catch (error) {
    console.error("Error updating docente:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta DELETE para eliminar un docente por ID
route.delete("/:id", async (req, res) => {
  try {
    const message = await docenteService.deleteDocente(req.params.id);
    res.json(message);
  } catch (error) {
    console.error("Error deleting docente:", error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = route;
