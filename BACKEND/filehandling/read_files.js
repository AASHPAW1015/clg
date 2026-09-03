const fs = require("fs");

const filePath = "demo.txt";

try {
  const content = fs.readFileSync(filePath, "utf-8");
  console.log(`the content of "${filePath}":\n`);
  console.log(content);
  console.log(`file end`);
} catch (error) {
  console.error(`error reading file:`, error.message);
}
