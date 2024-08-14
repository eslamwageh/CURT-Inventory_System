const express = require("express");
const router = express.router();
const {
  InventoryItem,
  MechanicalPart,
  RawMaterial,
  ElectricalPart,
} = require("../models/InventoryItem");
const { authenticate } = require("../middlewares/auth");

// route to add a general inventory item
router.post("/add", authenticate, async (req, res) => {
  const { name, quantity } = req.body;
  const userId = req.user.id;
  const newItem = new InventoryItem({ name, quantity, userId });
  try {
    await newItem.save();
    console.log("tmam");
    res.status(201).json({ status: "success", item: newItem });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

// route to add a mechanical part
router.post("/mechanical", authenticate, async (req, res) => {
  const { name, quantity, material, dimensions, weight } = req.body;
  const userId = req.user.id;
  const newMechanicalPart = new MechanicalPart({
    name,
    quantity,
    material,
    dimensions,
    weight,
    userId,
  });
  try {
    await newMechanicalPart.save();
    res.status(201).json({ status: "success", item: newMechanicalPart });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

router.post("/rawmaterial", authenticate, async (req, res) => {
  const { name, quantity, type, purity } = req.body;
  const userId = req.user.id;
  const newRawMaterial = new RawMaterial({
    name,
    quantity,
    type,
    purity,
    userId,
  });
  try {
    await newRawMaterial.save();
    res.status(201).json({ status: "success", item: newRawMaterial });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

router.post("/electrical", authenticate, async (req, res) => {
  const { name, quantity, voltage, current, powerRating } = req.body;
  const userId = req.user.id;
  const newElectricalPart = new ElectricalPart({
    name,
    quantity,
    voltage,
    current,
    powerRating,
    userId,
  });
  try {
    await newElectricalPart.save();
    res.status(201).json({ status: "success", item: newElectricalPart });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

// route to get all inventory items for the authenticated user
router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the authenticatede user
    const items = await InventoryItem.find({ userId });

    const itemsWithDescriptions = items.map((item) => ({
      ...item.toObject(), // to convert the mongoose document to a plain object
      description: item.GetDescription(), // calling the description to add it in the dto
    }));
    console.log(itemsWithDescriptions);
    res.status(200).json({ status: "success", items: itemsWithDescriptions });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

module.exports = router;
