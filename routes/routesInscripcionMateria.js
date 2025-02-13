const express = require("express");
const servicesInscripcionMateria = require("../services/servicesInscripcionMateria");
const router = express.Router();
const inscripcionMateriaService = new servicesInscripcionMateria();

// Ruta GET para obtener todas las inscripciones de materia
router.get("/", async (req, res) => {
  try {
    const inscripciones =
      await inscripcionMateriaService.getAllInscripcionMateria();
    res.json(inscripciones);
  } catch (error) {
    console.error("Error fetching inscripcion materia:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta GET para obtener una inscripcion de materia por id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const inscripcion = await inscripcionMateriaService.getInscripcionMateria(
      id
    );
    res.json(inscripcion);
  } catch (error) {
    console.error("Error fetching inscripcion materia:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta POST para crear una nueva inscripcion de materia
router.post("/", async (req, res) => {
  try {
    const newInscripcion =
      await inscripcionMateriaService.createInscripcionMateria(req.body);
    res.status(201).json(newInscripcion);
  } catch (error) {
    console.error("Error creating inscripcion materia:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta PUT para actualizar una inscripcion de materia por id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInscripcion =
      await inscripcionMateriaService.updateInscripcionMateria(id, req.body);
    res.json(updatedInscripcion);
  } catch (error) {
    console.error("Error updating inscripcion materia:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta DELETE para eliminar una inscripcion de materia por id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const message = await inscripcionMateriaService.deleteInscripcionMateria(
      id
    );
    res.json(message);
  } catch (error) {
    console.error("Error deleting inscripcion materia:", error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
