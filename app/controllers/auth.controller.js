
import db  from "../models/index.js";
import authconfig  from "../config/auth.config.js";
import { OAuth2Client } from "google-auth-library";
import  { google } from "googleapis";
import jwt from "jsonwebtoken";

const User = db.user;
const Session = db.session;
const Op = db.Sequelize.Op;

let googleUser = {};

const google_id = process.env.CLIENT_ID;

const exports = {};

exports.login = async (req, res) => {
  try {
    const googleToken = req.body.credential;
    const client = new OAuth2Client(google_id);

    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: google_id,
    });

    const googleUser = ticket.getPayload();
    const email = googleUser.email;
    const firstName = googleUser.given_name;
    const lastName = googleUser.family_name;

    let user = await User.findOne({ where: { email } });

    // ✅ Create new user if not exists
    if (!user) {
      user = await User.create({
        fName: firstName,
        lName: lastName,
        email,
        role: null // ✅ Prevent ENUM failure so we can set it later
      });
    } else {
      // ✅ Update name in case changed in Google
      await User.update(
        { fName: firstName, lName: lastName },
        { where: { id_user: user.id_user } }
      );
    }

    // Check for existing valid session
    let session = await Session.findOne({
      where: {
        id_user: user.id_user,
        token: { [Op.ne]: "" }
      }
    });

    if (session && session.expirationDate > Date.now()) {
      console.log("Existing valid session found");
      return res.json({
        email,
        fName: firstName,
        lName: lastName,
        id_user: user.id_user,
        token: session.token,
        role: user.role,
      });
    }

    // ✅ Create new session
    const token = jwt.sign({ id: email }, authconfig.secret, {
      expiresIn: 86400,
    });

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    const newSession = await Session.create({
      token,
      id_user: user.id_user,
      expirationDate,
    });

    console.log("Created new session");

    return res.json({
      email,
      fName: firstName,
      lName: lastName,
      id_user: user.id_user,
      token,
      role: user.role,
    });


  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Authentication failed" });
  }
};

exports.authorize = async (req, res) => {
  console.log("authorize client");
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "postmessage"
  );

  console.log("authorize token");
  // Get access and refresh tokens (if access_type is offline)
  let { tokens } = await oauth2Client.getToken(req.body.code);
  oauth2Client.setCredentials(tokens);

  let user = {};
  console.log("findUser");

  await User.findOne({
    where: {
      id_user: req.params.id_user,
    },
  })
    .then((data) => {
      if (data != null) {
        user = data.dataValues;
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
    });
  console.log("user");
  console.log(user);
  user.refresh_token = tokens.refresh_token;
  let tempExpirationDate = new Date();
  tempExpirationDate.setDate(tempExpirationDate.getDate() + 100);
  user.expiration_date = tempExpirationDate;

  await User.update(user, { where: { id_user: user.id_user } })
    .then((num) => {
      if (num == 1) {
        console.log("updated user's google token stuff");
      } else {
        console.log(
            `Cannot update User with id_user=${user.id_user}. Maybe User was not found or req.body is empty!`
        );
      }
      let userInfo = {
        refresh_token: user.refresh_token,
        expiration_date: user.expiration_date,
      };
      console.log(userInfo);
      res.send(userInfo);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });

  console.log(tokens);
  console.log(oauth2Client);
};

exports.logout = async (req, res) => {
  console.log(req.body);
  if (req.body === null) {
    res.send({
      message: "User has already been successfully logged out!",
    });
    return;
  }

  // invalidate session -- delete token out of session table
  let session = {};

  await Session.findAll({ where: { token: req.body.token } })
    .then((data) => {
      if (data[0] !== undefined) session = data[0].dataValues;
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sessions.",
      });
      return;
    });

  session.token = "";

  // session won't be null but the id will if no session was found
  if (session.id_session !== undefined) {
    Session.update(session, { where: { id_session: session.id_session } })
      .then((num) => {
        if (num == 1) {
          console.log("successfully logged out");
          res.send({
            message: "User has been successfully logged out!",
          });
        } else {
          console.log("failed");
          res.send({
            message: `Error logging out user.`,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Error logging out user.",
        });
      });
  } else {
    console.log("already logged out");
    res.send({
      message: "User has already been successfully logged out!",
    });
  }
};
export default exports;
