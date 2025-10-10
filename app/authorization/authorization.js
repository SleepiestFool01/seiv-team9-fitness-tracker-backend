import db from "../models/index.js";

const Session = db.session;

const authenticate = async (req, res, next) => {
  const authHeader = req.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({
      message: "Unauthorized! No Auth Header",
    });
  }

  const token = authHeader.slice(7).trim();
  if (!token) {
    return res.status(401).send({
      message: "Unauthorized! Invalid token supplied",
    });
  }

  try {
    const session = await Session.findOne({ where: { token } });
    if (!session) {
      return res.status(401).send({
        message: "Unauthorized! Invalid token, please login again",
      });
    }

    const expiration = new Date(session.expirationDate);
    if (Number.isNaN(expiration.valueOf()) || expiration < new Date()) {
      await Session.update({ token: "" }, { where: { id: session.id } });
      return res.status(401).send({
        message: "Unauthorized! Expired Token, logout and login again",
      });
    }

    req.session = session;
    return next();
  } catch (err) {
    console.error("Error validating session token", err);
    return res.status(500).send({
      message: "Internal server error validating session token",
    });
  }
};

export default authenticate;
