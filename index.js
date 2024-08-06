require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const usersRoute = require("./routes/users.route");
const requestStatus = require("./utils/requestStatus");

const connect = async () => {
  await mongoose.connect(process.env.MONGO_DB);
  console.log("connected to DB");
};
connect().catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, "public")));

const {
  volunteersController,
  editController,
  downloadSheet,
} = require("./controllers/edit.controller");
const sheet = require("./middleware/sheet");

app.use(express.json());
app.use(cors());

app.get("/allVolunteers", sheet, volunteersController);
app.use("/api/users", usersRoute);
app.post("/edit", sheet, editController);
app.get("/downloadSheet", sheet, downloadSheet);

app.all("*", (req, res) => {
  return res.status(400).json({ message: "wrong request" });
});

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.errorType || requestStatus.ERROR,
    code: err.status || 400,
    message: err.message || "something is Wrong",
    data: null,
  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("connect is done");
});
