const mongoose=require("mongoose")
const validator=require("validator")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,   
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not a valid email.")
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Not a strong passowrd")
            }
        }
        
    },
    verified:{
        type:Boolean,
        default:false
    },
    authtoken:{
        type:String
    },
    
})

//password hashing
userSchema.pre("save", async function(next) { 
    if (this.isModified("password")) {
        this.password = await bcryptjs.hash(this.password, 10)
        next()
    }
})
userSchema.pre("updateOne", async function(next) { 
    const data = this.getUpdate()
    console.log("data is:",data);
    if(data.password){
        data.password = await bcryptjs.hash(data.password, 10)
    }
    next()  
})

// //generating jwt
// userSchema.methods.generateAutheticationToken = async function() {
//     try {
//         const _id=this.id
//         const token = await jwt.sign(_id, process.env.SECRET_KEY) //1) is my unique identifier 2) is my secret key
//         this.authtoken = token
//         await this.save()
//         return token
//     } catch (error) {
//         console.log(`ERROR occured: ${error}`);
//     }
// }
//generating jwt
userSchema.methods.generateAutheticationToken = async function() {
    try {
        const _id=this.id
        const token = await jwt.sign(_id, process.env.SECRET_KEY) //1) is my unique identifier 2) is my secret key
        this.authtoken = token
        await this.save()
        //console.log("auth token: ",token);
        return token
    } catch (error) {
        console.log(`ERROR occured: ${error}`);
    }
}


const userModel=new mongoose.model("User",userSchema)

module.exports=userModel