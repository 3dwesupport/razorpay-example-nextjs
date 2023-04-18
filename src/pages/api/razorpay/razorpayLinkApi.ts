import Razorpay from "razorpay";
import {nanoid} from "nanoid";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();
/**
 * create link api for razorpay
 * @param req
 * @param res
 */
export default async function handler(req: any, res: any) {
    var instance = new Razorpay(
        {
            key_id: req.body.gatewayId,
            key_secret: req.body.razorpayKey
        }
    )

    const requestAsync = async () => {
        return new Promise((resolve, reject) => {
            let localData = instance.paymentLink.create({
                amount: req.body.amount,
                currency: req.body.currency,
                accept_partial: true,
                first_min_partial_amount: 100,
                description: req.body.description,
                customer: {
                    name: req.body.username,
                    email: req.body.email,
                    contact: req.body.mobileNo
                },
                notify: {
                    sms: true,
                    email: true
                },
                reminder_enable: true,
                notes: {
                    policy_name: "Jeevan Bima"
                },
                callback_url: "http://localhost:3000/api/razorpay/razorpayLinkStatus",
                callback_method: "get"
            })
            resolve(localData)
        })
    }

    const currentDate = new Date(Date.now())
    let result:any = await requestAsync()
    // @ts-ignore
    const data={
        amount:req.body.amount/100,
        currency:req.body.currency,
        index_id : nanoid(10),
        gatewayId: req.body.gatewayId,
        gateway:"razorpay",
        paymentStatus :result.status,
        order_id:result.id,
        paymentTime: currentDate
    }
    // @ts-ignore
    await prisma.Payment_Info
        .createMany({
            data: [data]
        })
        .then(async (res: any) => {
            console.log("Created", res.count, "order");
            // @ts-ignore
            await prisma.Payment_Info
                .findMany({
                    orderBy: {
                        order_id: 'desc'
                    },
                })
                .then((res: any) => {
                    console.log(res);
                })
                .catch((err: any) => {
                    console.log("Error in fetching orders: ", err);
                })
        })
        .catch((err: any) => {
            console.log("Error in creating orders: ", err);
        })
    res.status(200).json(result);
}
