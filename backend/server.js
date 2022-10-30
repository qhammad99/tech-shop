const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// env config
const res = dotenv.config({path:'./config/config.env'});

// connect database
connectDatabase();

app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});