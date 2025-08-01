import { expect } from "chai";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../../controllers/notesController.js";
import Note from "../../models/schema.js";
import "../setup.js";

describe("Notes Controller", function () {
  describe("getNotes", function () {
    it("should return all notes", async function () {
      // Create test notes
      const testNote1 = new Note({
        id: "1",
        title: "Test Note 1",
        content: "Content 1",
      });
      const testNote2 = new Note({
        id: "2",
        title: "Test Note 2",
        content: "Content 2",
      });

      await testNote1.save();
      await testNote2.save();

      // Mock request and response objects
      const req = {};
      const res = {
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.data = data;
          return this;
        },
      };

      await getNotes(req, res);

      expect(res.statusCode).to.equal(200);
      expect(res.data).to.be.an("array");
      expect(res.data).to.have.length(2);
    });

    it("should handle database errors", async function () {
      // Mock request and response objects
      const req = {};
      const res = {
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.data = data;
          return this;
        },
      };

      // Mock Note.find to throw an error
      const originalFind = Note.find;
      Note.find = function () {
        throw new Error("Database error");
      };

      await getNotes(req, res);

      expect(res.statusCode).to.equal(500);
      expect(res.data).to.have.property("message", "Error fetching notes");

      // Restore original function
      Note.find = originalFind;
    });
  });

  describe("createNote", function () {
    it("should create a new note with valid data", async function () {
      const req = {
        body: {
          title: "New Note",
          content: "New Content",
        },
      };
      const res = {
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.data = data;
          return this;
        },
      };

      await createNote(req, res);

      expect(res.statusCode).to.equal(201);
      expect(res.data).to.have.property("title", "New Note");
      expect(res.data).to.have.property("content", "New Content");
      expect(res.data).to.have.property("id");

      // Verify note was saved to database
      const savedNote = await Note.findOne({ title: "New Note" });
      expect(savedNote).to.not.be.null;
    });

    it("should handle missing title", async function () {
      const req = {
        body: {
          content: "Content without title",
        },
      };
      const res = {
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.data = data;
          return this;
        },
      };

      await createNote(req, res);

      expect(res.statusCode).to.equal(400);
    });
  });

  describe("updateNote", function () {
    let testNote;

    beforeEach(async function () {
      testNote = new Note({
        id: "update-test-123",
        title: "Original Title",
        content: "Original Content",
      });
      await testNote.save();
    });

    it("should update an existing note", async function () {
      const req = {
        params: { id: "update-test-123" },
        body: {
          title: "Updated Title",
          content: "Updated Content",
        },
      };
      const res = {
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.data = data;
          return this;
        },
      };

      await updateNote(req, res);

      expect(res.statusCode).to.equal(200);
      expect(res.data).to.have.property("title", "Updated Title");
      expect(res.data).to.have.property("content", "Updated Content");
    });

    it("should return 404 for non-existent note", async function () {
      const req = {
        params: { id: "non-existent" },
        body: {
          title: "Updated Title",
          content: "Updated Content",
        },
      };
      const res = {
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.data = data;
          return this;
        },
      };

      await updateNote(req, res);

      expect(res.statusCode).to.equal(404);
    });
  });

  describe("deleteNote", function () {
    let testNote;

    beforeEach(async function () {
      testNote = new Note({
        id: "delete-test-123",
        title: "Note to Delete",
        content: "This will be deleted",
      });
      await testNote.save();
    });

    it("should delete an existing note", async function () {
      const req = {
        params: { id: "delete-test-123" },
      };
      const res = {
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.data = data;
          return this;
        },
      };

      await deleteNote(req, res);

      expect(res.statusCode).to.equal(200);

      // Verify note was deleted
      const deletedNote = await Note.findOne({ id: "delete-test-123" });
      expect(deletedNote).to.be.null;
    });

    it("should return 404 for non-existent note", async function () {
      const req = {
        params: { id: "non-existent" },
      };
      const res = {
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.data = data;
          return this;
        },
      };

      await deleteNote(req, res);

      expect(res.statusCode).to.equal(404);
    });
  });
});
