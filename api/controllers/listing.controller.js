import Listing from "../model/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
        try {
                const listing = await Listing.create(req.body)
                await listing.save();
                res.status(200).json(listing);
        } catch (error) {
                next(error)
        }
}

export const deleteListing = async (req, res, next) => {
        try {
                const listing = await Listing.findById(req.params.id);
                if (!listing) return next(errorHandler(404, 'Listing not found'))
                if (req.user.id !== listing.userRef) {
                        return next(errorHandler(404, "You can only delete your own listings"))
                }

                await Listing.findByIdAndDelete(req.params.id);
                res.status(201).json("List has been deleted")
        } catch (error) {
                next(error)
        }
}

export const updateListing = async (req, res, next) => {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return next(errorHandler(401, "Listing not found"));
        if (req.user.id !== listing.userRef) {
                return next(errorHandler(404, "You can only delete your own listings"));
        }
        try {
                const updatedListing = await Listing.findByIdAndUpdate(
                        req.params.id,
                        req.body,
                        { new: true }
                )
                res.status(201).json(updatedListing);
        } catch (error) {
                next(error)
        }
}

export const getListing = async (req, res, next) => {
        try {

                const listing = await Listing.findById(req.params.id);
                if (!listing) return next(errorHandler(404, 'Listing not found'))
                res.status(201).json(listing);
        } catch (error) {
                next(error)
        }
}
export const getListings = async (req, res, next) => {
        try {
                const limit = parseInt(req.query.limit) || 9;
                const startIndex = parseInt(req.query.startIndex) || 0;
                let offer = req.query.offer;
                if (offer === undefined || offer === 'false') {
                        offer = { $in: [false, true] }; //undefined is when there is no offer,that means we want both offer and no offer 
                }
                let furnished = req.query.furnished;
                if (furnished === undefined || furnished === 'false') {
                        furnished = { $in: [false, true] }
                }
                let parking = req.query.parking;
                if (parking === undefined || parking === 'false') {
                        parking = { $in: [false, true] }
                }
                let type = req.query.type;
                if (type === undefined || type === 'all') {
                        type = { $in: ['sale', 'rent'] }
                }
                const searchTerm = req.query.searchTerm || '';
                const sort = req.query.sort || 'createdAt'; //latest by default
                const order = req.query.order || 'desc'; //desc is default behavior

                const listings = await Listing.find({
                        name: { $regex: searchTerm, $options: 'i' },
                        offer, //search for the offer
                        furnished, //seach for the furnished
                        parking,
                        type,
                }).sort(
                        { [sort]: order } //whatever the kind of sort,sort it according to order
                ).limit(limit).skip(startIndex);
                //if the startIndex is 0 they are gonna start from the beginning
                //if it is 1 ,they r gonna skip first nine cuz default limit is 9

                return res.status(200).json(listings)

        } catch (error) {

        }
}