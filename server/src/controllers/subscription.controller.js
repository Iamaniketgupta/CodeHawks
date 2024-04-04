import Stripe from "stripe";
import { Mentee } from "../models/mentee.model.js";
import Mentor from "../models/mentor.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getSubscription = asyncHandler(async (req, res) => {
    const { mentorId, menteeId, price, months } = req.body;
    if (!(mentorId && menteeId && price && months)) {
        throw new ApiError(400, "All fields are required");
    }

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
        throw new ApiError(400, "mentor dont exist");
    }

    const mentee = await Mentee.findById(menteeId);
    if (!mentee) {
        throw new ApiError(400, "Mentee dont exist");
    }

    const subscription = await Subscription.create(
        {
            mentor: mentorId,
            mentee: menteeId.
                price,
            months
        }
    );

    if (!subscription) {
        throw new ApiError(500, "Error while creating subscription");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            subscription,
            "Subscription made successfully"
        )
    )
})


const getCheckoutSession = asyncHandler(async (req, res) => {
    const { mentorId } = req.params;

    const { _id, email } = req.user;

    if (!mentorId)
        throw ApiError(400, "Mentor Id not Found");

    const mentor = await Mentor.findById(mentorId).select("-password -refreshToken");
    if (!mentor)
        throw ApiError(404, "Mentor not Found");

    const mentee = await Mentee.findById(_id).select("-password -refreshToken");
    if (!mentee)
        throw ApiError(404, "Mentee not Found");

    const stripe = new Stripe(process.env.STRIPE_SECRET);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${window.location.origin}/checkout-success`,
        cancel_url: `${window.location.origin}/Mentor/${mentorId}`,
        customer_email: email,
        client_reference_id: mentorId,
        line_items: [{
            price_data: {
                currency: 'inr',
                unit_amount: mentor.pricing.mentorshipPrice * 100,
                product_data: {
                    name: mentor.fullName,
                    images: mentor.avatar,
                }
            },
            quantity: 1
        }]

    })

    const subscription = new Subscription({
        mentor: mentorId,
        mentee: _id,
        Price: mentor.pricing.mentorshipPrice,
        session: session.id
    })

    const subscriptionDone = await subscription.save();

    if (!subscriptionDone)
    throw ApiError(500, "Internal Server Error");


        res.status(201).json({
            success: true,
            message: 'Successfully paid',
            session: session
        });

})




export {
    getSubscription,
    getCheckoutSession
}