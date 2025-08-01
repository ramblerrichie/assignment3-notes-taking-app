import { expect } from "chai";
import request from "supertest";
import express from "express";
import notesRouter from "../routes/notesRouter.js";
import "./setup.js";

// Create Express app for integration testing
const app = express();
app.use(express.json());
app.use("/api", notesRouter);

describe("Notes API Integration Tests", function () {
  it("should create, read, update, and delete a note (CRUD)", async function () {
    // CREATE: Create a new note
    const newNote = {
      title: "Integration Test Note",
      content: "This is an integration test",
    };

    const createResponse = await request(app)
      .post("/api")
      .send(newNote)
      .expect(201);

    expect(createResponse.body).to.have.property("id");
    const noteId = createResponse.body.id;

    // READ: Get all notes and verify our note exists
    const readResponse = await request(app).get("/api").expect(200);

    expect(readResponse.body).to.be.an("array");
    expect(readResponse.body).to.have.length(1);
    expect(readResponse.body[0]).to.have.property("title", newNote.title);

    // UPDATE: Update the note
    const updatedNote = {
      title: "Updated Integration Test Note",
      content: "This content has been updated",
    };

    const updateResponse = await request(app)
      .put(`/api/${noteId}`)
      .send(updatedNote)
      .expect(200);

    expect(updateResponse.body).to.have.property("title", updatedNote.title);
    expect(updateResponse.body).to.have.property(
      "content",
      updatedNote.content
    );

    // DELETE: Delete the note
    await request(app).delete(`/api/${noteId}`).expect(200);

    // Verify note is deleted
    const finalReadResponse = await request(app).get("/api").expect(200);

    expect(finalReadResponse.body).to.have.length(0);
  });

  it("should handle multiple notes correctly", async function () {
    // Create multiple notes
    const notes = [
      { title: "Note 1", content: "Content 1" },
      { title: "Note 2", content: "Content 2" },
      { title: "Note 3", content: "Content 3" },
    ];

    const createdNotes = [];
    for (const note of notes) {
      const response = await request(app).post("/api").send(note).expect(201);
      createdNotes.push(response.body);
    }

    // Verify all notes are returned
    const readResponse = await request(app).get("/api").expect(200);

    expect(readResponse.body).to.have.length(3);

    // Update one note
    const updatedData = {
      title: "Updated Note 2",
      content: "Updated Content 2",
    };

    await request(app)
      .put(`/api/${createdNotes[1].id}`)
      .send(updatedData)
      .expect(200);

    // Delete one note
    await request(app).delete(`/api/${createdNotes[0].id}`).expect(200);

    // Verify final state
    const finalResponse = await request(app).get("/api").expect(200);

    expect(finalResponse.body).to.have.length(2);
  });
});
