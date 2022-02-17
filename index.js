require("dotenv").config();

const session = require("express-session");
const MongoStore = require("connect-mongo");

const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require ("./routes/auth")
const recipeRoutes = require ("./routes/recipes")


async function start() {
    try {
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: true,
            saveUninitialized: false,
            store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URL,
            }),
            cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            sameSite: true,
            secure: false,
            },
        })
        );

    app.use(express.json());
    // allows to process all form data
    app.use(express.urlencoded({ extended: true }));
    // cors middleware is to allow request comming from a diferent url than the one hosting the server
    app.use(cors({ credentials: true, origin: "*" }));

    

      const { PORT } = process.env;
      app.use("/api", authRoutes);
      app.use("/api/recipes", recipeRoutes )
  
      app.get("/", (req, res) => {
        res.status(200).json({ message: "running" });
      });
  
      app.listen(PORT, () => console.log(`Server running at: ${PORT}`));
    } catch (err) {
      console.log(err.message);
    }
  }
  
start()
  