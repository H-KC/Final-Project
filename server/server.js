const express = require("express");
const connectDB = require("./config/db");
const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "hey its hkc" });
});
//connect to DB
connectDB();

// init Middleware
app.use(express.json({ extended: true }));

//Define Routes
app.use("/api/buildings", require("./routes/buildings"));
app.use("/api/buildingSteps", require("./routes/buildingSteps"));
app.use("/api/waterTowers", require("./routes/waterTowers"));
app.use("/api/waterTowerStpes", require("./routes/waterTowerSteps"));
app.use("/api/expenses", require("./routes/expenses"));
app.use("/api/companies", require("./routes/companies"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server up and running"));
