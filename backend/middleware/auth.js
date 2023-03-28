import { auth } from "express-oauth2-jwt-bearer";
import { config } from "../config/config.js";
import jwt_decode from "jwt-decode";
import { UsersModel } from "../models/usersModel.js";

export const validateAccessToken = auth({
  issuerBaseURL: `https://${config.REACT_APP_AUTH0_DOMAIN}`,
  audience: config.REACT_APP_AUTH0_AUDIENCE,
});

export const isAuthorizedAuth0UserId = async function (req, res, next) {
  const accessToken = req.headers.authorization.split(" ")[1];
  const decoded = jwt_decode(accessToken);
  const currentAuth0UserId = decoded.sub.split("|")[1];
  const auth0UserId = req.params.auth0UserId || req.body.auth0UserId;
  if (currentAuth0UserId !== auth0UserId) {
    return res.status(403).send("Unauthorized");
  }
  next();
};

export const isAuthorizedUserId = async function (req, res, next) {
  const accessToken = req.headers.authorization.split(" ")[1];
  const decoded = jwt_decode(accessToken);
  const currentAuth0UserId = decoded.sub.split("|")[1];
  const currentUser = await UsersModel.findOne({
    where: { auth0UserId: currentAuth0UserId },
  });
  const userId = req.params.userId || req.body.userId || req.query.userId;
  console.log("current user id: " + currentUser.id);
  console.log("user id: " + userId);
  if (Number(currentUser.id) !== Number(userId)) {
    return res.status(403).send("Unauthorized");
  }
  next();
};
