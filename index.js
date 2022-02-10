require("dotenv").config();

const app = require("express")();
const authRoutes = require ("./routes/auth")
const recipeRoutes = require ("./routes/recipes")

async function start() {
    try {
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
  