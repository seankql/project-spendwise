import Router from "express";
// Base route: /api/users
export const usersController = Router();

usersController.get("/", (req, res) => {
  res.send("Hello from users controller");
});
