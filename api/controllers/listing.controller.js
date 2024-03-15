import Listing from "../model/listing.model.js";

export const createListing = async (req, res, next) => {
        try {
                        const listing = await Listing.create(req.body)
                        await listing.save(); 
                res.status(200).json(listing);
        } catch (error) {
                next(error)
        }
}