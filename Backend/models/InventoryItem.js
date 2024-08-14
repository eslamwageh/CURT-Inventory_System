const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// InventoryItem schema
const InventoryItemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// instance method to get the description
InventoryItemSchema.methods.GetDescription = function () {
  return `Item: ${this.name}, Quantity: ${this.quantity}`;
};

// creating the base InventoryItem model
const InventoryItem = mongoose.model("InventoryItem", InventoryItemSchema);

// MechanicalPart derived model and so on the rest
const MechanicalPartSchema = new Schema({
  material: { type: String, required: true },
  dimensions: { type: String, required: true },
  weight: { type: Number, required: true },
});

MechanicalPartSchema.methods.GetDescription = function () {
  return `Mechanical Part: ${this.name}, Material: ${this.material}, Dimensions: ${this.dimensions}, Weight: ${this.weight}, Quantity: ${this.quantity}`;
};

const MechanicalPart = InventoryItem.discriminator(
  "MechanicalPart",
  MechanicalPartSchema
);

const RawMaterialSchema = new Schema({
  type: { type: String, required: true },
  purity: { type: String, required: true },
});

RawMaterialSchema.methods.GetDescription = function () {
  return `Raw Material: ${this.name}, Type: ${this.type}, Purity: ${this.purity}, Quantity: ${this.quantity}`;
};

const RawMaterial = InventoryItem.discriminator(
  "RawMaterial",
  RawMaterialSchema
);

const ElectricalPartSchema = new Schema({
  voltage: { type: Number, required: true },
  current: { type: Number, required: true },
  powerRating: { type: Number, required: true },
});

ElectricalPartSchema.methods.GetDescription = function () {
  return `Electrical Part: ${this.name}, Voltage: ${this.voltage}V, Current: ${this.current}A, Power Rating: ${this.powerRating}W, Quantity: ${this.quantity}`;
};

const ElectricalPart = InventoryItem.discriminator(
  "ElectricalPart",
  ElectricalPartSchema
);

module.exports = { InventoryItem, MechanicalPart, RawMaterial, ElectricalPart };
