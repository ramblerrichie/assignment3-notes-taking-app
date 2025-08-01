import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: String, required: false },
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
