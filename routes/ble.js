const express = require("express");

const ble = require("../controllers/ble");

const router = express.Router();

router.post("/simulateAll", ble.simulateAll);
router.post("/cancelSimulationAll", ble.cancelSimulationAll);

module.exports = router;
