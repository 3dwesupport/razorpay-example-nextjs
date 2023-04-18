import {validatePaymentVerification} from "razorpay/dist/utils/razorpay-utils";

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

/**
 * return the status of  payment against a payment link
 * @param req
 * @param res
 */
export default async function postTransaction(req: any, res: any) {
    const query = req.query;
    const status = validatePaymentVerification({
        "payment_link_id": query.razorpay_payment_link_id,
        "payment_id": query.razorpay_payment_id,
        "payment_link_reference_id": query.razorpay_payment_link_reference_id,
        "payment_link_status": query.razorpay_payment_link_status,
    }, query.razorpay_signature, 'SgtJVdB2M4OnPtaK5SMo205d');
    const currentDate = new Date(Date.now())
    await prisma.Payment_Info.updateMany({
        where: {
            order_id: query.razorpay_payment_link_id // The ID of the row you want to update
        },
        data: {
            paymentStatus: "paid",
            paymentTime: currentDate
        }
    }).then()
    res.status(200).json(status);
}
