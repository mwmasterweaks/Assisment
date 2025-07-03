import express from "express";
import { db } from "../data/db";
import { Note } from "../models/Note";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/", (req, res) => {
  const { agentId, propertyId, content, reminderDate } = req.body;
  const newNote: Note = {
    id: uuidv4(),
    agentId,
    propertyId,
    content,
    reminderDate,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  db.notes.push(newNote);
  res.status(201).json(newNote);
});

router.get("/", (req, res) => {
  res.json(db.notes);
});

router.get("/:id", (req, res) => {
  const note = db.notes.find((n) => n.id === req.params.id);
  if (!note) {
    res.status(404).json({ message: "Note not found" });
    return;
  }
  res.json(note);
});

router.put("/:id", (req, res) => {
  const note = db.notes.find((n) => n.id === req.params.id);
  if (!note) {
    res.status(404).json({ message: "Note not found" });
    return;
  }
  const { agentId, propertyId, content, reminderDate } = req.body;
  note.agentId = agentId;
  note.propertyId = propertyId;
  note.reminderDate = reminderDate;
  note.content = content;
  note.updatedAt = new Date();
  res.json(note);
});

router.delete("/:id", (req, res) => {
  const index = db.notes.findIndex((n) => n.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: "Note not found" });
    return;
  }
  db.notes.splice(index, 1);
  res.status(204).send();
});

export default router;
