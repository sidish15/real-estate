import mongoose from "mongoose";
const listingSchema=new mongoose.Schema({
        name:{
                type:String,
                required:true
        },
        description:{

        },
        address:{

        },
        regularPrice:{

        },
        discountPrice:{

        },
        bathrooms:{

        },
        bedrooms:{

        },
        furnished:{

        },
        parking:{

        },
        type:{

        },
        offer:{

        },
        imageUrls:{

        },
        userRef:{
                type:String,
                required:true
        }
        

},{timestamps:true}
)
const Listing=mongoose.model('Listing',listingSchema)
export default Listing;