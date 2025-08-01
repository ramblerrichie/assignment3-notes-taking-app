// Import
import Note from "../models/schema.js";

// Generate unique ID
function generateId() {
  return Date.now().toString();
}

// Function getNotes
export async function getNotes(req, res) {
  try {
    const notes = await Note.find({});
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
  }
}

// Function createNote
export async function createNote(req, res) {
  const { title, content } = req.body;

  // Validate required fields
  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  if (!content || content.trim() === "") {
    return res.status(400).json({ message: "Content is required" });
  }

  try {
    const newNote = new Note({
      id: generateId(),
      title: title.trim(),
      content: content.trim(),
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating note" });
  }
}

// Function updateNote
export async function updateNote(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;

  // Validate required fields
  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  if (!content || content.trim() === "") {
    return res.status(400).json({ message: "Content is required" });
  }

  try {
    const updatedNote = await Note.findOneAndUpdate(
      { id },
      { title: title.trim(), content: content.trim(), updatedAt: new Date() },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Error updating note" });
  }
}

// Function deleteNote
export async function deleteNote(req, res) {
  const { id } = req.params;

  try {
    const deletedNote = await Note.findOneAndDelete({ id });
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note" });
  }
}
