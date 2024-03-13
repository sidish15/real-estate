import jwt from 'jsonwebtoken'
import { errorHandler } from "./error.js";

export const verifyToken=(req,res,next)=>{
        const token=req.cookies.access_token; //get the token
         if(!token) return next(errorHandler(401,"Unauthorized"));

         //comparing the toen
         jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
                if(err) return next(errorHandler(403,'Forbidden'))
              console.log(user);
                //we want to send the user data to next function i.e updateUser
                // so we wanna send inside the request
                req.user=user; //rhs user(=id) is the user that we are getting from the cookie ,save the user to the request
                console.log(req.user);
                next()
         })

}