// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction


import {NextApiRequest, NextApiResponse} from 'next'
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
import { nanoid } from 'nanoid'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const options = req.body;
    options.index_id = nanoid(10);
    console.log("options::::::::::::",options)
    await prisma.PaymentGateway
        .createMany({
            data: [options]
        })
        .then(async (res) => {
            console.log("Created", res.count, "order");
            await prisma.PaymentGateway
                .findMany({
                    orderBy: {
                        order_id: 'desc'
                    },
                })
                .then((res) => {
                    console.log("Fetched employee details sorted by employee IDs -");
                    console.log(res);
                })
                .catch((err) => {
                    console.log("Error in fetching employees: ", err);
                })
        })
        .catch((err) => {
            console.log("Error in creating employees: ", err);
        })
    res.status(200).json(options);

}

