const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// handling uncaught exception
// like console.log(udnefined_value);
process.on("uncaughtException", (error) => {
  console.log(`Error ${error.message}`);
  console.log(`Shttting down the server due to uncaught exception`);

  process.exit(1);
});

// env config
dotenv.config({ path: "./config/config.env" });

// connect database: connected for whole project
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// unhandeled promise handler---as in db connection
// shut down the server
process.on("unhandledRejection", (error) => {
  console.log(`Error ${error.message}`);
  console.log(`Shttting down the server due to unhandeled rejection`);

  server.close(() => {
    process.exit(1);
  });
});
