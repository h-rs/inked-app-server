import mongoose from "mongoose";
import Entry from "../models/entry.model.js";

export const getEntries = async (req, res) => {
  console.log("***** inside getEntries *****");
  let { searchTerm } = req.query;
  // console.log("user", req.session);
  let results = [];
  try {
    const entries = await Entry.find({ isTrashed: false });
    if (searchTerm) {
      searchTerm = searchTerm?.toLowerCase();
      results = entries.filter((e) => {
        return (
          e.title?.toLowerCase().includes(searchTerm) ||
          e.description?.toLowerCase().includes(searchTerm)
        );
      });
    } else {
      results = entries;
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEntry = async (req, res) => {
  try {
    const entry = req.body;
    const newEntry = new Entry(entry);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getEntryById = async (req, res) => {
  try {
    let { id } = req.params;
    if (mongoose.isValidObjectId(id)) {
      let entry = await Entry.findById(id);
      res.status(200).json(entry);
    } else {
      return res.status(404).send("Invalid Object_ID");
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateEntry = async (req, res) => {
  try {
    let entry = req.body;
    if (mongoose.isValidObjectId(entry._id)) {
      const updatedEntry = await Entry.findByIdAndUpdate(
        entry._id,
        { ...entry },
        { new: true }
      );
      res.json(updatedEntry);
    } else {
      return res.status(404).send("Invalid Object_ID");
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getTrashedEntries = async (req, res) => {
  try {
    const trashedEntries = await Entry.find({ isTrashed: true });
    // console.log("trashedEntries", trashedEntries);
    res.status(200).json(trashedEntries);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    console.log("deleteEntry");
    const { id } = req.params;
    console.log(id);
    if (mongoose.isValidObjectId(id)) {
      const result = await Entry.deleteOne({ _id: id });
      res.status(200).json(result);
    } else {
      return res.status(404).send("Invalid Object_ID");
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const trashEntry = async (req, res) => {
  try {
    console.log("********** inside trashEntry **********");
    const entry = req.body;
    if (mongoose.isValidObjectId(entry._id)) {
      const updatedEntry = await Entry.findByIdAndUpdate(
        entry._id,
        { ...entry, isTrashed: true, trashedDate: new Date().toISOString() },
        { new: true }
      );
      res.json(updatedEntry);
    } else {
      return res.status(404).send("Invalid Object_ID");
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const restoreEntry = async (req, res) => {
  try {
    let entry = req.body;
    if (mongoose.isValidObjectId(entry._id)) {
      const updatedEntry = await Entry.findByIdAndUpdate(
        entry._id,
        { ...entry, isTrashed: false, trashedDate: null },
        { new: true }
      );
      res.json(updatedEntry);
    } else {
      return res.status(404).send("Invalid Object_ID");
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
