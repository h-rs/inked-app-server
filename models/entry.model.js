import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  postedDate: String,
  lastUpdated: String,
  mood: {
    id: String,
    icon: String,
    color: String,
    selected: Boolean,
  },
  author: String,
  tags: [String],
  isTrashed: Boolean,
  trashedDate: String,
});

const Entry = mongoose.model("Entry", entrySchema);

export default Entry;
