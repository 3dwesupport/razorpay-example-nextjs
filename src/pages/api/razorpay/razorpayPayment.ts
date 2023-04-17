// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {NextApiRequest, NextApiResponse} from 'next'
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
import {nanoid} from 'nanoid'

/**
 * update the paytm status of the transaction in database
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const options = req.body;
    options.index_id = nanoid(10);
    options.gateway = "razorpay";
    const currentDate = new Date(Date.now())
    res.status(200).json(options);
    await prisma.Payment_Info.updateMany({
        where: {
            order_id :req.body.order_id,// The ID of the row you want to updatr
        },
        data: {
            paymentStatus: "paid",
            paymentTime: currentDate
        }
    }).then()
}

