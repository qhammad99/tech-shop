const app = require('./app');
const dotenv = require('dotenv');

// env config
const res = dotenv.config({path:'./config/config.env'});

app.listen(process.env.PORT, ()=>{
    console.log(res);
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});