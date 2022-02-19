require("dotenv").config();

const session = require("express-session");
const MongoStore = require("connect-mongo");
const winston = require("winston");
const mongoose = require("mongoose");

const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/item");

const { NODE_ENV, MONGODB_URL, SESSION_SECRET, FRONTEND_URL, PORT } =
  process.env;

function sessionConfig() {
  const isProduction = NODE_ENV === "production";
  const sameSite = isProduction ? "none" : "lax";
  app.set("trust proxy", 1);
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: MONGODB_URL,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        sameSite,
        secure: isProduction,
      },
    })
  );
}

async function start() {
  try {
    await mongoose.connect(MONGODB_URL);
    app.use(express.json());
    // allows to process all form data
    app.use(express.urlencoded({ extended: true }));
    // cors middleware is to allow request comming from a diferent url than the one hosting the server
    app.use(cors({ credentials: true, origin: FRONTEND_URL }));

    sessionConfig();
    app.use((req, res, next) => {
      winston.log("session", req.session);
      next();
    });
    app.use("/api/items", itemRoutes);
    app.use("/api", authRoutes);

    app.get("/", (req, res) => {
      res.status(200).json({ message: "running" });
    });

    app.listen(PORT, () => console.log(`Server running at: ${PORT}`));
  } catch (err) {
    console.log(err.message);
  }
}

start();
