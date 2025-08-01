import { expect } from "chai";
import request from "supertest";
import express from "express";
import notesRouter from "../../routes/notesRouter.js";
import Note from "../../models/schema.js";
import "../setup.js";

// Create Express app for testing
const app = express();
app.use(express.json());
app.use("/api", notesRouter);

describe("Notes API Routes", function () {
  describe("GET /api", function () {
    it("should return empty array when no notes exist", async function () {
      const response = await request(app).get("/api").expect(200);

      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length(0);
    });

    it("should return all notes when notes exist", async function () {
      // Create test notes
      const testNote1 = new Note({
        id: "1",
        title: "Test Note 1",
        content: "This is test content 1",
      });
      const testNote2 = new Note({
        id: "2",
        title: "Test Note 2",
        content: "This is test content 2",
      });

      await testNote1.save();
      await testNote2.save();

      const response = await request(app).get("/api").expect(200);

      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length(2);
      expect(response.body[0]).to.have.property("title", "Test Note 1");
      expect(response.body[1]).to.have.property("title", "Test Note 2");
    });
  });

  describe("POST /api", function () {
    it("should create a new note with valid data", async function () {
      const noteData = {
        title: "New Test Note",
        content: "This is new test content",
      };

      const response = await request(app)
        .post("/api")
        .send(noteData)
        .expect(201);

      expect(response.body).to.have.property("title", noteData.title);
      expect(response.body).to.have.property("content", noteData.content);
      expect(response.body).to.have.property("id");

      // Verify note was saved to database
      const savedNote = await Note.findOne({ title: noteData.title });
      expect(savedNote).to.not.be.null;
    });

    it("should return 400 for missing title", async function () {
      const noteData = {
        content: "Content without title",
      };

      await request(app).post("/api").send(noteData).expect(400);
    });

    it("should return 400 for missing content", async function () {
      const noteData = {
        title: "Title without content",
      };

      await request(app).post("/api").send(noteData).expect(400);
    });
  });

  describe("PUT /api/:id", function () {
    let testNote;

    beforeEach(async function () {
      testNote = new Note({
        id: "test-id-123",
        title: "Original Title",
        content: "Original Content",
      });
      await testNote.save();
    });

    it("should update an existing note", async function () {
      const updateData = {
        title: "Updated Title",
        content: "Updated Content",
      };

      const response = await request(app)
        .put("/api/test-id-123")
        .send(updateData)
        .expect(200);

      expect(response.body).to.have.property("title", updateData.title);
      expect(response.body).to.have.property("content", updateData.content);

      // Verify note was updated in database
      const updatedNote = await Note.findOne({ id: "test-id-123" });
      expect(updatedNote.title).to.equal(updateData.title);
      expect(updatedNote.content).to.equal(updateData.content);
    });

    it("should return 404 for non-existent note", async function () {
      const updateData = {
        title: "Updated Title",
        content: "Updated Content",
      };

      await request(app)
        .put("/api/non-existent-id")
        .send(updateData)
        .expect(404);
    });
  });

  describe("DELETE /api/:id", function () {
    let testNote;

    beforeEach(async function () {
      testNote = new Note({
        id: "test-delete-123",
        title: "Note to Delete",
        content: "This note will be deleted",
      });
      await testNote.save();
    });

    it("should delete an existing note", async function () {
      await request(app).delete("/api/test-delete-123").expect(200);

      // Verify note was deleted from database
      const deletedNote = await Note.findOne({ id: "test-delete-123" });
      expect(deletedNote).to.be.null;
    });

    it("should return 404 for non-existent note", async function () {
      await request(app).delete("/api/non-existent-id").expect(404);
    });
  });
});
