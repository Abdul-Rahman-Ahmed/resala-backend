const excel = require("exceljs");
const sheet = async (req, res, next) => {
  try {
    const workbook = new excel.Workbook();
    await workbook.xlsx.readFile("./main.xlsx");
    const workSheet = workbook.worksheets[0];
    req.workSheet = workSheet;
    req.workbook = workbook;
    next();
  } catch (err) {
    res.status(404).json({ status: "failed", msg: err });
  }
};

module.exports = sheet;
