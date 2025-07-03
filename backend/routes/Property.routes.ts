import express from "express";
import { db } from "../data/db";
import { Property } from "../models/Property";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/", (req, res) => {
  const { agentId, address, rent, unitNumber, type } = req.body;
  const newProperty: Property = {
    id: uuidv4(),
    agentId,
    address,
    rent,
    unitNumber,
    type,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  db.properties.push(newProperty);
  res.status(201).json(newProperty);
});

router.get("/", (req, res) => {
  res.json(db.properties);
});

router.get("/:id", (req, res) => {
  const property = db.properties.find((p) => p.id === req.params.id);
  if (!property) {
    res.status(404).json({ message: "Property not found" });
    return;
  }
  res.json(property);
});

router.put("/:id", (req, res) => {
  const property = db.properties.find((p) => p.id === req.params.id);
  if (!property) {
    res.status(404).json({ message: "Property not found" });
    return;
  }
  const { agentId, address, rent, unitNumber, type } = req.body;
  property.agentId = agentId;
  property.address = address;
  property.rent = rent;
  property.unitNumber = unitNumber;
  property.type = type;
  property.updatedAt = new Date();
  res.json(property);
});

router.delete("/:id", (req, res) => {
  const index = db.properties.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: "Property not found" });
    return;
  }
  db.properties.splice(index, 1);
  res.status(204).send();
});

export default router;