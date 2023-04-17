import {nanoid} from "nanoid";
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
const https = require('https');
const PaytmChecksum = require('paytmchecksum');

/**
 * response of the paytm payment link
 * @param req
 * @param res
 */
export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        let paytmParams: any = {};

        paytmParams.body = {
            "mid": req.body.mid,
            "linkType": "FIXED",
            "linkDescription": req.body.description,
            "linkName": "Test",
            "amount": req.body.amount,
            "statusCallbackUrl": "http://localhost:3000/api/checkPaymentStatus"
        };

        /*
        * Generate checksum by parameters we have in body
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
        */
        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "SnuVjF30cYhMEv2D")

        // @ts-ignore
        paytmParams.head = {
            "tokenType": "AES",
            "signature": checksum
        };

        let post_data = JSON.stringify(paytmParams);
        const requestAsync = async () => {
            return new Promise((resolve, reject) => {

                let options = {
                    /* for Production */
                    hostname: 'securegw.paytm.in',
                    port: 443,
                    path: '/link/create',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                let response = "";
                let post_req = https.request(options, async function (post_res: any) {
                    post_res.on('data', function (chunk: any) {
                        response += chunk;
                    });

                    return post_res.on('end', async function () {
                        // data += response
                        resolve(JSON.parse(response).body)
                    });
                });
                post_req.write(post_data);
                post_req.end();
            });

        }
        const currentDate = new Date(Date.now())
        const requestAsyncStatus = requestAsync().then((res: any) => {
            return res.linkId.toString()
        })
        let result = await requestAsync()
        const options = {
            amount: parseInt(req.body.amount),
            currency: "INR",
            gateway: "paytm",
            index_id: nanoid(10),
            gatewayId: req.body.mid,
            paymentStatus: "created",
            order_id: requestAsyncStatus,
            paymentTime: currentDate
        }
        await prisma.Payment_Info
            .createMany({
                data: [options]
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
}


