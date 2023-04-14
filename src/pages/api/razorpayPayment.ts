// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {NextApiRequest, NextApiResponse} from 'next'
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
import {nanoid} from 'nanoid'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("value of the data is mzhjdjdjd ",req.body)
    const options = req.body;
    options.index_id = nanoid(10);
    options.gateway = "razorpay";
    await prisma.Payment_Info.updateMany({
        where: {
            order_id :req.body.order_id // The ID of the row you want to update
        },
        data: {
            paymentStatus: "paid"
        }
    }).then()
    res.status(200).json(options);
}

