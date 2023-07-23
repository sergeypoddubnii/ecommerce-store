import Stripe from 'stripe';
import {PrismaClient} from '@prisma/client';
import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(req:NextApiRequest, res: NextApiResponse){
    if(req.method === 'GET'){
        try {
            const user = getServerSession(req, res, authOptions);

            if(!user){
                res.status(403).json({message: 'Not logged in'})
            }

            const orders = prisma.order.findMany({
                where: {
                    userId: user?.user?.id
                },
                include: {
                    products: true
                }
            });
            res.status(200).json(orders);
        } catch (e){
          res.status(500).json({message: 'Failed to fetch orders'})
        }
    } else {
        res.setHeader('Allow', 'GET');
        res.status(405).end('Methods not allowed')
    }
};
