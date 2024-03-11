import mongoose  from "mongoose";

const userSchema=new mongoose.Schema({
       username:{
 type:String,
 required:true,
 unique:true,
       },
        email:{
                type:String,
                required:true,
                unique:true
        },
        password:{
                type:String,
                required:true,
                
        },
        avatar:{
                type:String,
                default:"https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"
        },
        


},{timestamps:true})
// timestamps tell us the time of creation and updation of user 
const User=mongoose.model('User',userSchema);

export default User;