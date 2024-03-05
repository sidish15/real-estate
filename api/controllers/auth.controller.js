import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup =async(req,res,next)=>{
        // console.log(req.body);
        const {username,email,password}=req.body;
        const hashedPassword=bcryptjs.hashSync(password,10);
     //    hashSync func is async itself
        const newUser=new User({username,email,password:hashedPassword});
        try{

             await newUser.save()
      //        by using await ,first 7th line will be implemented then others(async)
           res.status(201).json("User created successfully")
      //      //this will save newUser into our db and User created succ will show as a response
     }catch(error){
          //   res.status(500).json(error.message)

          next(error);

          // to use middleware 
          //next takes error as a input

     }
      }
     

/*
 notes
 1.Best way to handle error is using middleware and function

*/

export const signin=async(req,res,next)=>{
const  {email,password}=req.body;
try{
const validUser=await User.findOne({email:email});
if(!validUser) return next(errorHandler(404,'User not found!'));
const validPassword=bcryptjs.compareSync(password,validUser.password);
if(!validPassword)return next(errorHandler(401,'Wrong Credentials'));
const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);

const {password:pass,...rest}=validUser._doc;
// password:pass bc password named variable had already declared before 

res
.cookie('access_token',token,{httpOnly:true})
.status(200)
.json(rest);

}catch(error){
     next(error);
}

}

