import express from "express";
import { db } from "../data/db";
import { Tenant } from "../models/Tenant";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/", (req, res) => {
  const { propertyId, firstName, lastName, phone, email } = req.body;
  const newTenant: Tenant = {
    id: uuidv4(),
    propertyId,
    firstName,
    lastName,
    email,
    phone,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  db.tenants.push(newTenant);
  res.status(201).json(newTenant);
});

router.get("/", (req, res) => {
  res.json(db.tenants);
});

router.get("/:id", (req, res) => {
  const tenant = db.tenants.find((t) => t.id === req.params.id);
  if (!tenant) {
    res.status(404).json({ message: "Tenant not found" });
    return;
  }
  res.json(tenant);
});

router.put("/:id", (req, res) => {
  const tenant = db.tenants.find((t) => t.id === req.params.id);
  if (!tenant) {
    res.status(404).json({ message: "Tenant not found" });
    return;
  }
  const { propertyId, firstName, lastName, phone, email } = req.body;
  tenant.propertyId = propertyId;
  tenant.firstName = firstName;
  tenant.lastName = lastName;
  tenant.phone = phone;
  tenant.email = email;
  tenant.updatedAt = new Date();
  res.json(tenant);
});

router.delete("/:id", (req, res) => {
  const index = db.tenants.findIndex((t) => t.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: "Tenant not found" });
    return;
  }
  db.tenants.splice(index, 1);
  res.status(204).send();
});

export default router;