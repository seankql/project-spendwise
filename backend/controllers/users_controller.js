import Router from "express";
import { UsersModel } from "../models/usersModel.js";

//******** This is A test file to be later deleted. Using Auth0 for authentication and user creation.***************

// Base route: /api/users
export const usersController = Router();

// Create a new user: POST /api/users
usersController.post("/", async (req, res) => {
  try {
    const { username, hashedPassword, email } = req.body;
    if (!username || !hashedPassword || !email) {
      return res.status(400).send("Missing required fields");
    }
    const newUser = await UsersModel.create({
      username,
      hashedPassword,
      email,
    });
    return res.status(201).send(newUser);
  } catch (err) {
    return res.status(500).send("Internal Server error" + err);
  }
});

// Delete a user: DELETE /api/users/:userId
usersController.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).send("Missing required fields");
    }
    const numOfDeletedRows = await UsersModel.destroy({ where: { userId } });
    if (numOfDeletedRows === 0) {
      return res.status(404).send("User not found");
    }
    return res.status(204).send();
  } catch (err) {
    return res.status(500).send("Internal Server error" + err);
  }
});

// Get a user based on userId: GET /api/users/:userId
usersController.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).send("Missing required fields");
    }
    const user = await UsersModel.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send("Internal Server error" + err);
  }
});
