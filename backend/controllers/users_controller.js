import Router from "express";
import { UsersModel } from "../models/usersModel.js";
import Sentry from "@sentry/node";
import { validateAccessToken, isAuthorizedAuth0UserId } from "../middleware/auth.js";

// Base route: /api/users
export const usersController = Router();

// Create a new user: POST /api/users
usersController.post("/", validateAccessToken, isAuthorizedAuth0UserId, async (req, res) => {
  try {
    const { auth0UserId, email } = req.body;
    if (!auth0UserId || !email) {
      return res.status(400).send("Missing required fields");
    }
    const user = await UsersModel.findOne({
      where: { auth0UserId: auth0UserId },
    });
    if (!user) {
      const newUser = await UsersModel.create({
        auth0UserId: auth0UserId,
        email: email,
      });
      return res.status(201).send(newUser);
    }
  } catch (err) {
    // Sentry.captureException(err);
    return res.status(500).send("Internal Server error" + err);
  }
});

// Delete a user: DELETE /api/users/:auth0UserId
usersController.delete("/:auth0UserId", validateAccessToken, isAuthorizedAuth0UserId, async (req, res) => {
  try {
    const { auth0UserId } = req.params;
    if (!auth0UserId) {
      return res.status(400).send("Missing required fields");
    }
    const numOfDeletedRows = await UsersModel.destroy({
      where: { auth0UserId: auth0UserId },
    });
    if (numOfDeletedRows === 0) {
      return res.status(404).send("User not found");
    }
    return res.status(204).send();
  } catch (err) {
    // Sentry.captureException(err);
    return res.status(500).send("Internal Server error" + err);
  }
});

// Get a user based on auth0UserId: GET /api/users/:auth0UserId
usersController.get("/:auth0UserId", validateAccessToken, isAuthorizedAuth0UserId, async (req, res) => {
  try {
    const { auth0UserId } = req.params;
    if (!auth0UserId) {
      return res.status(400).send("Missing required fields");
    }

    const user = await UsersModel.findOne({
      where: { auth0UserId: auth0UserId },
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const newUser = {
      id: user.id,
      auth0UserId: user.auth0UserId,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return res.status(200).send(newUser);
  } catch (err) {
    // Sentry.captureException(err);
    return res.status(500).send("Internal Server error" + err);
  }
});
