const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) =>
      console.log(`MongoDb connected with: ${data.connection.host}`)
    );
  // .catch(err => console.log(`MondoDb error: ${err}`));
  // commenting catch to make this error unhandeled and shutdown the server in server.js
  // if unhandled error
};

module.exports = connectDatabase;
