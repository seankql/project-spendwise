import Router from "express";
// Base route: /api/users
const usersController = Router();

usersController.get("/", (req, res) => {
  res.send("Hello from users controller");
});

exports.usersController = usersController;
