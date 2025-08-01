// Import //
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import notesRouter from "./routes/notesRouter.js";
import createAuthRouter from "./routes/authRouter.js";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import methodOverride from "method-override";
import initializePassport from "./passport-config.js";

// config //
dotenv.config();

// DB connection //
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Express app //
const app = express();

const users = [];

// Initialize Passport
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(express.static("public"));

// Authentication functions
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

// Create auth router with dependencies
const authRouter = createAuthRouter(
  users,
  checkAuthenticated,
  checkNotAuthenticated
);

// Use routers
app.use("/", authRouter);
app.use("/api", notesRouter);

// Start server //
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
