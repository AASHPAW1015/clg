const fs = require("fs");

const filePath = "demo.txt";

const content = "Apple apple";

try {
  fs.appendFileSync(filePath, content, "utf-8");
  console.log(`content written successfully! to ${filePath}`);
} catch (error) {
  console.error(`error appending to file:`, error.message);
}
