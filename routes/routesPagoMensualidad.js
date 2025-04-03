const express = require("express");
const ServicesPagoMensualidad = require("../services/servicesPagoMensualidad");
const router = express.Router();
const pagoService = new ServicesPagoMensualidad();

// Ruta GET para obtener todos los pagos
router.get("/", async (req, res) => {
  try {
    const pagos = await pagoService.getAllPagos();
    res.json(pagos);
  } catch (error) {
    console.error("Error fetching pagos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta GET para obtener un pago por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pago = await pagoService.getPago(id);
    res.json(pago);
  } catch (error) {
    console.error("Error fetching pago:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta POST para crear un nuevo pago
router.post("/", async (req, res) => {
  try {
    const newPago = await pagoService.createPago(req.body);
    res.status(201).json(newPago);
  } catch (error) {
    console.error("Error creating pago:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta PUT para actualizar un pago por ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPago = await pagoService.updatePago(id, req.body);
    res.json(updatedPago);
  } catch (error) {
    console.error("Error updating pago:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta DELETE para eliminar un pago por ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const message = await pagoService.deletePago(id);
    res.json(message);
  } catch (error) {
    console.error("Error deleting pago:", error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
