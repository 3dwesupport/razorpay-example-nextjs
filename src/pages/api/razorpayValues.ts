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
        id: nanoid(10),
        gateway: "razorpay",
        paymentId: query.razorpay_payment_id,
        paymentStatus: query.razorpay_payment_link_status
    }
    await prisma.Payment_Info.updateMany({
        where: {
            order_id :query.razorpay_payment_link_id // The ID of the row you want to update
        },
        data: {
          paymentStatus: "paid"
        }
    }).then()
    res.status(200).json(status);
}
