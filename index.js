//* IMPORT
const app = require("./src/app.js");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.emv.PORT_PRIVATE;

const server = app.listen(PORT, () => {
  console.info(`💸 Api backend start with http://localhost:${PORT} 🔥`);
});

process.on("SIGINT", () => {
  server.close(() => console.log(`Exit Server Express`));
});
