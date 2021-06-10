const Express = require("express");
const Router = Express.Router();
const bodyParser = require("body-parser");
const User = require("./controllers/Users");
const { body } = require("express-validator");

Router.use(bodyParser.urlencoded({ extended: true }));

Router.get("/", User.index);
Router.post("/register", 
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("first_name").notEmpty().withMessage("First name can't be empty"),
    body("last_name").notEmpty().withMessage("Last name can't be empty"),
    body("password").isLength({ min: 6}).withMessage("Password should be at least 6 characters"),
    body("confirm_password").not().matches('password').withMessage('Passwords must match.')
, User.register);
Router.post("/login", User.login);
Router.get("/students/profile", User.profile);
Router.get("/logout", User.logout);

module.exports = Router;