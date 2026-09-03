// write content to file, overrites existing content

const fs = require("fs");

const filePath = "demo.txt";
const content = "Apple";

try {
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`content written successfully! to ${filePath}`);
} catch (error) {
  console.error(`error writing to file:`, error.message);
}
