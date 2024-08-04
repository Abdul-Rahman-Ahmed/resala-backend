require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.static("public"));
const {
  volunteersController,
  editController,
  downloadSheet,
} = require("./controllers/edit.controller");
const sheet = require("./middleware/sheet");

app.use(express.json());
app.use(cors());

app.get("/allVolunteers", sheet, volunteersController);
app.post("/edit", sheet, editController);
app.get("/downloadSheet", sheet, downloadSheet);

app.listen(process.env.PORT || 4000, () => {
  console.log("connect is done");
});
