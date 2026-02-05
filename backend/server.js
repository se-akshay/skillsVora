const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const authRoute = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const Port = process.env.PORT || 3000;
const mongoURI =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/employeeDB";

function connectDb() {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log("DB Error: ", err);
    });
}

connectDb();

app.use("/api/auth", authRoute);
app.use("/api/employee", employeeRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Healthy" });
});

app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
  //   console.log(`MongoDB URI: ${MONGODB_URI}`);
});
