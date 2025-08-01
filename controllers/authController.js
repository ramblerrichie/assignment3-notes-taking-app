import passport from "passport";
import bcrypt from "bcrypt";

// Controller functions for authentication
function createAuthController(users) {
  return {
    // Render home page
    getHome: (req, res) => {
      res.render("index.ejs", { name: req.user.name });
    },

    // Render login page
    getLogin: (req, res) => {
      res.render("login.ejs");
    },

    // Handle login authentication
    postLogin: passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    }),

    // Render register page
    getRegister: (req, res) => {
      res.render("register.ejs");
    },

    // Handle user registration
    postRegister: async (req, res) => {
      try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
          id: Date.now().toString(),
          name: req.body.username,
          email: req.body.email,
          password: hashPassword,
        });
        res.redirect("/login");
      } catch (error) {
        res.redirect("/register");
      }
      console.log(users);
    },

    // Handle user logout
    deleteLogout: (req, res, next) => {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/login");
      });
    },
  };
}

export default createAuthController;
