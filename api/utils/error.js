export const errorHandler =(statusCode,message)=>{
        // we are taking statusCode and message manually 

// using error constructor
const error=new Error();
error.statusCode=statusCode;
error.message=message;
return error;
} 

// this will be the manually created error