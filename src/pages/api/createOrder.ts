// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {NextApiRequest, NextApiResponse} from "next";
import {httpRequest, method} from "@/pages/api/httpRequest";
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
import { nanoid } from 'nanoid'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const options = req.body;
    let isProcessed = false;
    let isError = ""
    const headers = {
        'Content-Type': 'application/json',
    }
    let apiUrl = "https://api.razorpay.com/v1" + "/orders";
    // @ts-ignore
    let result = await httpRequest(req, apiUrl, method.POST, headers, options, {
        username: "rzp_test_XnlOuOZNrannpU",
        password: "tVOBOvJuHEaF7SfLHRhyLFn6"
    });
    options.order_id = nanoid(10);
    options.gateway = "razorpay";

    await prisma.Orders
        .createMany({
            data: [options]
        })
        .then(async (res: any) => {
            console.log("Created", res.count, "order");
            await prisma.Orders
                .findMany({
                    orderBy: {
                        order_id: 'desc'
                    },
                })
                .then((res: any) => {
                    console.log("Fetched orders details sorted by orders IDs -");
                    console.log(res);
                    isProcessed = true;
                })
                .catch((err: any) => {
                    console.log("Error in fetching orders: ", err);
                    isError = err
                })
        })
        .catch((err: any) => {
            console.log("Error in creating orders: ", err);
            isError = err
        })


    res.status(200).json(result.data);
}
