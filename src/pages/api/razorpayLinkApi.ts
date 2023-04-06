import {NextApiRequest, NextApiResponse} from "next";
import Razorpay from "razorpay";


export default async function handler(req: any, res: any) {
    var instance = new Razorpay(
        {
            key_id: 'rzp_test_SDSHr77Ftm5eIV',
            key_secret: 'SgtJVdB2M4OnPtaK5SMo205d'
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
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
                    contact: "+919000090000"
                },
                notify: {
                    sms: true,
                    email: true
                },
                reminder_enable: true,
                notes: {
                    policy_name: "Jeevan Bima"
                },
                callback_url: "http://localhost:3000/api/razorpayValues",
                callback_method: "get"
            })
            resolve(localData)
        })
    }
    let result = await requestAsync()
    res.status(200).json(result);
}
