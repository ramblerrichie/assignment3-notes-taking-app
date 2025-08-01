let notes = [];
let editingNoteId = null;

// API endpoints
const API_BASE = "/api";

// Function to load notes
async function loadNotes() {
  try {
    const response = await fetch(`${API_BASE}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to load notes");
      return [];
    }
  } catch (error) {
    console.error("Error loading notes:", error);
    return [];
  }
}

// Function to save a note
async function saveNote(event) {
  event.preventDefault();

  const title = document.getElementById("noteTitle").value.trim();
  const content = document.getElementById("noteContent").value.trim();
  const saveBtn = document.querySelector(".save-btn");
  const originalText = saveBtn.innerHTML;

  // Show loading state
  saveBtn.innerHTML = "Saving...";
  saveBtn.disabled = true;

  try {
    if (editingNoteId) {
      // Edit existing note
      const response = await fetch(`${API_BASE}/${editingNoteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const updatedNote = await response.json();
        const noteIndex = notes.findIndex((note) => note.id === editingNoteId);
        notes[noteIndex] = updatedNote;
      } else {
        console.error("Failed to update note");
        return;
      }
    } else {
      // Add new note
      const response = await fetch(`${API_BASE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const newNote = await response.json();
        notes.unshift(newNote);
      } else {
        console.error("Failed to create note");
        return;
      }
    }

    closeNoteDialog();
    renderNotes();
  } catch (error) {
    console.error("Error saving note:", error);
  } finally {
    // Reset button state
    saveBtn.innerHTML = originalText;
    saveBtn.disabled = false;
  }
}

// Function to generate a ID for each note
function generateId() {
  return Date.now().toString();
}

// Function to delete a note
async function deleteNote(noteId) {
  try {
    const response = await fetch(`${API_BASE}/${noteId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      notes = notes.filter((note) => note.id !== noteId);
      renderNotes();
    } else {
      console.error("Failed to delete note");
    }
  } catch (error) {
    console.error("Error deleting note:", error);
  }
}

// Function to render notes
function renderNotes() {
  const notesContainer = document.getElementById("notesContainer");

  if (notes.length === 0) {
    notesContainer.innerHTML = `
      <div class="empty-state">
        <h2>No notes yet</h2>
        <p>Create your first note to get started on your journey!</p>
        <button class="add-note-btn" onclick="openNoteDialog()">Add Your First Note</button>
      </div>
    `;
    return;
  }

  notesContainer.innerHTML = notes
    .map(
      (note) => `
    <div class="note-card">
      <h3 class="note-title">${note.title}</h3>
      <p class="note-content">${note.content}</p>
      <div class="note-actions">
        <button class="edit-note-btn" onclick="openNoteDialog('${note.id}')">
          Edit
        </button>
        <button class="delete-note-btn" onclick="confirmDelete('${note.id}')">
          Delete
        </button>
      </div>
    </div>
    `
    )
    .join("");
}

// Enhanced delete function with confirmation
function confirmDelete(noteId) {
  const note = notes.find((n) => n.id === noteId);
  if (confirm(`Are you sure you want to delete "${note.title}"?`)) {
    deleteNote(noteId);
  }
}

// Function to open a note window
function openNoteDialog(noteId = null) {
  const dialog = document.getElementById("noteDialog");
  const titleInput = document.getElementById("noteTitle");
  const contentInput = document.getElementById("noteContent");

  if (noteId) {
    // Edit Mode
    const noteToEdit = notes.find((note) => note.id === noteId);
    editingNoteId = noteId;
    document.getElementById("dialogTitle").textContent = "Edit Note";
    titleInput.value = noteToEdit.title;
    contentInput.value = noteToEdit.content;
  } else {
    // Add Mode
    editingNoteId = null;
    document.getElementById("dialogTitle").textContent = "Add New Note";
    titleInput.value = "";
    contentInput.value = "";
  }

  // Show the dialog in focus
  dialog.showModal();
  titleInput.focus();
}

// Function to close the note window
function closeNoteDialog() {
  const dialog = document.getElementById("noteDialog");
  dialog.close();
}

document.addEventListener("DOMContentLoaded", async function () {
  // Load notes from MongoDB via API
  notes = await loadNotes();
  // render the notes
  renderNotes();
  // save the note
  document.getElementById("noteForm").addEventListener("submit", saveNote);
  // close the note window by click outside the window
  document
    .getElementById("noteDialog")
    .addEventListener("click", function (event) {
      if (event.target === this) {
        closeNoteDialog();
      }
    });
});
