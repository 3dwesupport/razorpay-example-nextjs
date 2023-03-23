// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction


import {NextApiRequest, NextApiResponse} from 'next'

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
import {nanoid} from 'nanoid'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const options = req.body;
    options.index_id = nanoid(10);
    options.gateway = "razorpay";
    await prisma.Payment_Info
        .createMany({
            data: [options]
        })
        .then(async (res) => {
            console.log("Created", res.count, "order");
            await prisma.Payment_Info
                .findMany({
                    orderBy: {
                        order_id: 'desc'
                    },
                })
                .then((res) => {
                    console.log("Fetched orders details sorted by orders IDs -");
                    console.log(res);
                })
                .catch((err) => {
                    console.log("Error in fetching orders: ", err);
                })
        })
        .catch((err) => {
            console.log("Error in creating orders: ", err);
        })
    res.status(200).json(options);

}

