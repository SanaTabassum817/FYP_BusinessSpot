const express=require("express")
const cors = require("cors");
const env=require("dotenv").config()   //check
require("./DB/connection")  
const userRoutes=require("./Routes/user")
const categoryRoutes=require("./Routes/category")
const productRoutes=require("./Routes/product")
const cookieParser=require("cookie-parser")
const bodyParser=require('body-parser');
const multer=require('multer');

const app=express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}));


//app.use("/user",express.static("storage/images"));  // check path //TODO
app.use("/",userRoutes)
app.use("/",categoryRoutes)
app.use("/",productRoutes)


const port=process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`listening to port ${port} for backend`);
})