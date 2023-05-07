const mongoose = require("mongoose")
mongoose.set('strictQuery', true);
const dbUrl= process.env.DB_URL
// mongoose.set('strictQuery', true);
mongoose.connect(dbUrl)
    .then(() => {
        console.log("Connection Successful");
    })
    .catch((err) => {
        console.log(`Error occured while connecting with database: ${err}`);
    })

module.exports=dbUrl