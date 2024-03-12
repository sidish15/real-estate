import User from "../model/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
export const test =(req,res)=>{
        res.json({
                message:"Hello World"
        })
}

export const updateUser=async(req,res,next)=>{
        if(req.user.id!=req.params.id) return next(errorHandler(401,"You can only update your own account"))

        try{
                if(req.body.password){
                        //trying to update password
                        req.body.password=bcryptjs.hashSync(req.body.password,10);
                }
                const updateUser=await User.findByIdAndUpdate(req.params.id,{
                        $set:{
                                username:req.body.username,
                                email:req.body.email,
                                password:req.body.password,
                                avatar:req.body.avatar,
                        }
                        // set is used bc user is not gonna pass the whole data everytime
                        // set is gonna identify the data which is changing otherwise its gonna be ignore that data
                },{new:true})

                const {password,...rest}=updateUser._doc;

                res.status(200).json(rest);
            
        }catch(error){
                next(error)
        }
}