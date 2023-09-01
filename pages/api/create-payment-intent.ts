import Stripe from 'stripe';
import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {PrismaClient} from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2022-11-15' });

const calculateOrderAmount = (items:any) => {

    return items.reduce((acc:any, item:any) => {
        return acc += item.unit_amount * item.quantity
    }, 0);

}

const prisma = new PrismaClient();

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
        paymentIntentID: payment_intent_id,
        products: {
            create: items.map((item:any) => ({
                name: item.name,
                description: item.description || null,
                unit_amount: parseFloat(item.unit_amount),
                quantity: item.quantity,
                image: item.image
            }))
        }
    }

    if(payment_intent_id){
        const currentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);

        if(currentIntent){
            const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
                amount: calculateOrderAmount(items)
            })
            const existing_order = await prisma.order.findFirst({
                where: { paymentIntentID: updated_intent.id },
                include: { products: true }
            })
            if(!existing_order){
                res.status(400).json({message: 'invalid payment intend'})
            }

            await prisma.order.update({
                where: { id: existing_order?.id},
                data: {
                    amount: calculateOrderAmount(items),
                    products: {
                        deleteMany: {},
                        create: items.map((item:any) => ({
                            name: item.name,
                            description: item.description || null,
                            unit_amount: parseFloat(item.unit_amount),
                            quantity: item.quantity,
                            image: item.image
                        }))
                    }
                }
            })
            res.status(200).json({paymentIntent: updated_intent});
            return;
        }

    } else {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: 'usd',
            automatic_payment_methods: {enabled: true}
        })
        orderData.paymentIntentID = paymentIntent.id;
        const newOrder = await prisma.order.create({
            data: orderData
        })
        res.status(200).json({paymentIntent})
        return;
    }
}
