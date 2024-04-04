import express from "express";
import {
  getEntries,
  createEntry,
  getEntryById,
  updateEntry,
  getTrashedEntries,
  deleteEntry,
  trashEntry,
  restoreEntry,
} from "../controllers/entriesController.js";

const entriesRouter = express.Router();

entriesRouter.get("/trash", getTrashedEntries);

entriesRouter.get("/", getEntries);
entriesRouter.get("/:id", getEntryById);

entriesRouter.post("/", createEntry);

entriesRouter.put("/trash", trashEntry);
entriesRouter.put("/restore", restoreEntry);

entriesRouter.patch("/", updateEntry);

entriesRouter.delete("/:id/delete", deleteEntry);

export default entriesRouter;
