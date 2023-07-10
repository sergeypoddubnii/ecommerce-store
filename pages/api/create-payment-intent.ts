import Stripe from 'stripe';
import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2022-11-15' });

const calculateOrderAmount = (items:any) => {

    const total = items.reduce((acc:any, item:any) => {
        return acc += item.unit_amount * item.quantity
    }, 0);
}

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const userSession = await getServerSession(req, res, authOptions);

    if(!userSession){
        res.status(403).json({message: 'No logged in'});
        return;
    }

    const { items, payment_intent_id} = req.body;

    const orderData = {
        user: {connect: {id: userSession.user?.id}},
        amount: calculateOrderAmount(items),
        currency: 'usd',
        status: 'pending',
        paymentIntentId: payment_intent_id,
        products: {
            create: items.map((item) => ({
                name: item.name,
                description: item.description,
                unit_amount: item.unit_amount,
                quantity: item.quantity
            }))
        }

    }

    res.status(200).json({userSession})
    return;
}
