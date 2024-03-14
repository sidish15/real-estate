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
console.log(rest);
// we dont wanna send the password ..thats why we are separating 
// password:pass bc password named variable had already declared before 

res
.cookie('access_token',token,{httpOnly:true})
.status(200)
.json(rest);

}catch(error){
     next(error);
}

}

export const google=async(req,res,next)=>{
     
try{
     const user=await User.findOne({email:req.body.email})
     if(user){
// sign in 
const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
console.log(user);
const {password,...rest}=user._doc;
const newUser=new User({username:req.body.username})

res
.cookie('access_token',token,{httpOnly:true})
.status(200)
.json(rest);

     }else{
// create user
// generating password bc google doesnt give password
const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8)
const hashedPassword=bcryptjs.hashSync(generatedPassword,10);

// new user create
const newUser=new User({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),
// username was like siddharth singh (from google auth) but we want to make the username look like username
email:req.body.email,
password:hashedPassword,
avatar:req.body.photo
});

// new user saved
await newUser.save();
const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
const {password:pass,...rest}=newUser._doc;
res
.cookie('access_token',token,{httpOnly:true})
.status(200)
.json(rest);


     }
}catch(error){
     next(error);
}
}

export const signOut=async(req,res,next)=>{
try{
res.clearCookie('access_token');
res.status(200).json('User has been logged out!')
}catch(error){
next(error)
}
}