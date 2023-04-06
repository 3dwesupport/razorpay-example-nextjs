import Razorpay from "razorpay";
import {validatePaymentVerification} from "razorpay/dist/utils/razorpay-utils";
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
import {nanoid} from "nanoid";

export default async function postTransaction(req: any, res: any) {
    const query = req.query;

    const status = validatePaymentVerification({
        "payment_link_id": query.razorpay_payment_link_id,
        "payment_id": query.razorpay_payment_id,
        "payment_link_reference_id": query.razorpay_payment_link_reference_id,
        "payment_link_status": query.razorpay_payment_link_status,
    }, query.razorpay_signature, 'SgtJVdB2M4OnPtaK5SMo205d');

        const options = {
            id:nanoid(10),
            gateway: "razorpay",
            paymentId:query.razorpay_payment_id,
            paymentStatus:query.razorpay_payment_link_status
        }
    await prisma.Razorpay_Link
        .createMany({
            data: [options]
        })
        .then(async (res: any) => {
            console.log("Created", res.count, "order");
            await prisma.Razorpay_Link
                .findMany({
                    orderBy: {
                        order_id: 'desc'
                    },
                })
                .then((res: any) => {
                    console.log("Fetched orders details sorted by orders IDs -");
                    console.log(res);
                })
                .catch((err: any) => {
                    console.log("Error in fetching orders: ", err);
                })
        })
        .catch((err: any) => {
            console.log("Error in creating orders: ", err);
        })
    res.status(200).json(status);
}
