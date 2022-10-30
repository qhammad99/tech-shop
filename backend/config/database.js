const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser:true,
        useUnifiedTopology: true
    })
    .then(data => console.log(`MongoDb connected with: ${data.connection.host}`))
    .catch(err => console.log(`MondoDb error: ${err}`));
}

module.exports = connectDatabase;