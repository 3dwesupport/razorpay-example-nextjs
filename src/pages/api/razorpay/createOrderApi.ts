import {NextApiRequest, NextApiResponse} from "next";
import {httpRequest, method} from "@/pages/api/httpRequest";

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
import {nanoid} from 'nanoid'

/**
 * create Order api for razorpay
 * @param req
 * @param res
 */
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
    const currentDate = new Date(Date.now())
    res.status(200).json(result.data);
    const value = {
        index_id: nanoid(10),
        gateway: "razorpay",
        order_id: result.data.id,
        paymentStatus: result.data.status,
        amount: req.body.amount / 100,
        currency: req.body.currency,
        gatewayId: "rzp_test_XnlOuOZNrannpU",
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
