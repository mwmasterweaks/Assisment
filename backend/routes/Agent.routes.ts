import express from "express";
import { db } from "../data/db";
import { Agent } from "../models/Agent";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Create
router.post("/", (req, res) => {
  const { firstName, lastName, email, mobileNumber } = req.body;
 if (!firstName || !lastName || !email.includes('@') || mobileNumber.length < 10) {
   res.status(400).json({ message: "Invalid input: check all fields." });
   return;
  }
  const newAgent: Agent = {
    id: uuidv4(),
    firstName,
    lastName,
    email,
    mobileNumber,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  db.agents.push(newAgent);
  res.status(201).json(newAgent);
});

// Read all
router.get("/", (req, res) => {
  res.json(db.agents);
});

// Read one
router.get("/:id", (req, res) => {
  const agent = db.agents.find((a) => a.id === req.params.id);
  if (!agent) 
    { res.status(404).json({ message: "Agent not found" });
return;}
  res.json(agent);
});

// Update
router.put("/:id", (req, res) => {
  const agent = db.agents.find((a) => a.id === req.params.id);
  if (!agent) { res.status(404).json({ message: "Agent not found" });
return;}

  const { firstName, lastName, email, mobileNumber } = req.body;
  agent.firstName = firstName;
  agent.lastName = lastName;
  agent.email = email;
  agent.mobileNumber = mobileNumber;
  agent.updatedAt = new Date();

  res.json(agent);
});

// Delete
router.delete("/:id", (req, res) => {
  const index = db.agents.findIndex((a) => a.id === req.params.id);
  if (index === -1) { res.status(404).json({ message: "Agent not found" });return;}
  db.agents.splice(index, 1);
  res.status(204).send();
});

export default router;
