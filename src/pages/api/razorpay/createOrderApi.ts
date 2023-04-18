import {NextApiRequest, NextApiResponse} from "next";
import {httpRequest, method} from "@/pages/api/httpRequest";
import {nanoid} from 'nanoid'

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

/**
 * create Order api for razorpay
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {x
    const options = req.body;
    let isProcessed = false;
    let isError = ""
    const headers = {
        'Content-Type': 'application/json',
    }
    let apiUrl = "https://api.razorpay.com/v1" + "/orders";

    let auth = {
        username: options.razorpay_id,
        password: options.razorpayKey
    }
    delete options.razorpay_id
    delete options.razorpayKey
    // @ts-ignore
    let result = await httpRequest(req, apiUrl, method.POST, headers, options, auth);
    // let result = await createOrder(req, apiUrl, headers, options, auth)
    options.order_id = nanoid(10);
    options.gateway = "razorpay";
    const currentDate = new Date(Date.now())
    res.status(200).json(result.data);
    const value = {
        index_id: nanoid(10),
        gateway: "razorpay",
        order_id: result.data.id,
        paymentStatus: result.data.status,
        amount: req.body.amount / 100,
        currency: req.body.currency,
        gatewayId: req.body.razorpay_id,
        paymentTime: currentDate
    }
    await prisma.Payment_Info
        .createMany({
            data: [value]
        })
        .then(async (res: any) => {
            console.log("Created", res.count, "order");
            await prisma.Payment_Info
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

}
