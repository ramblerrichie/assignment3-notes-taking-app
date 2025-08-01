// Import
import { Router } from "express";
import createAuthController from "../controllers/authController.js";

const router = Router();

// Function to create auth router
function createAuthRouter(users, checkAuthenticated, checkNotAuthenticated) {
  // Create controller instance with users array
  const authController = createAuthController(users);

  // Home route
  router.get("/", checkAuthenticated, authController.getHome);

  // Login routes
  router.get("/login", checkNotAuthenticated, authController.getLogin);
  router.post("/login", checkNotAuthenticated, authController.postLogin);

  // Register routes
  router.get("/register", checkNotAuthenticated, authController.getRegister);
  router.post("/register", checkNotAuthenticated, authController.postRegister);

  // Logout route
  router.delete("/logout", authController.deleteLogout);

  return router;
}

export default createAuthRouter;
