const excel = require("exceljs");
const path = require("path");
const sheet = async (req, res, next) => {
  try {
    const workbook = new excel.Workbook();
    await workbook.xlsx.readFile(
      path.join(__dirname, "..", "public", "main.xlsx")
    );
    const workSheet = workbook.worksheets[0];
    req.workSheet = workSheet;
    req.workbook = workbook;
    next();
  } catch (err) {
    res.status(404).json({ status: "failed", msg: err });
  }
};

module.exports = sheet;
