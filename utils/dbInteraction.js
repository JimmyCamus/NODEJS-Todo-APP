const fs = require("fs");
const path = "./db/data.json";

const saveData = (data) => {
  fs.writeFileSync(path, JSON.stringify(data));
};

const readData = () => {
  if (!fs.existsSync(path)) {
    return null;
  }

  const response = fs.readFileSync(path, { encoding: "utf-8" });
  const data = JSON.parse(response);

  return data;
};

module.exports = {
  saveData,
  readData,
};
