const path = require("path");

const volunteersController = async (req, res) => {
  try {
    const workSheet = req.workSheet;
    const volunteers = [];
    workSheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        volunteers.push({
          name: row.getCell(1).value,
          number: row.getCell(2).value,
        });
      }
    });
    return res.json({ volunteers });
  } catch (err) {
    return res.status(404).json({ status: "failed", msg: err });
  }
};

const editController = async (req, res) => {
  const { id, date } = req.body;
  const workSheet = req.workSheet;
  const workbook = req.workbook;
  const row = workSheet.getRow(+id + 1);
  row.getCell(2 + +date).value = 1;
  await workbook.xlsx.writeFile("./main.xlsx");
  res.json({ update: "update is done" });
};

const downloadSheet = (req, res) => {
  const filePath = path.join(__dirname, "../public/main.xlsx");
  res.download(filePath, "شيت المشاركات.xlsx", (err) => {
    if (err) {
      console.error("Error downloading the file:", err);
      res.status(500).send("Error downloading the file.");
    }
  });
};

module.exports = { volunteersController, editController, downloadSheet };
