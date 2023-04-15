import paytmConfig from "./config";

const https = require('https');
const PaytmChecksum = require('paytmchecksum');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
import {nanoid} from 'nanoid'

export default async function postTransaction(req: any, res: any) {
    req.body.index_id = nanoid(10);
    req.body.gateway = "paytm";

    const currentDate = new Date(Date.now())
    const options = {
        index_id: nanoid(10),
        gateway: req.body.gateway,
        order_id: req.body.ORDERID.toString(),
        paymentStatus: req.body.STATUS,
        amount: parseInt(req.body.TXNAMOUNT),
        currency: req.body.CURRENCY,
        gatewayId: req.body.MID,
        paymentTime: currentDate
    }
    /* initialize an object */
    let paytmParams: any = {};
    /* body parameters */
    // @ts-ignore
    paytmParams.body = {

        /* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
        "mid": req.body.MID,

        /* Enter your order id which needs to be check status for */
        "orderId": req.body.ORDERID,
    };
    /**
     * Generate checksum by parameters we have in body
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */
    PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), paytmConfig.key).then(function (checksum: any) {
        /* head parameters */
        // @ts-ignore
        paytmParams.head = {

            /* put generated checksum value here */
            "signature": checksum
        };

        /* prepare JSON string for request */
        var post_data = JSON.stringify(paytmParams);

        var options = {

            // /* for Staging */
            // hostname: 'securegw-stage.paytm.in',

            /* for Production */
            hostname: 'securegw.paytm.in',
            port: 443,
            path: '/v3/order/status',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': post_data.length
            }
        };

        // Set up the request
        var response = "";
        var post_req = https.request(options, function (post_res: any) {
            post_res.on('data', function (chunk: any) {
                response += chunk;
            });

            post_res.on('end', function () {
                console.log('Response: ', response);
            });
        });

        // post the data
        post_req.write(post_data);
        post_req.end();
    });
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
    res.status(200).json({body: req.body})
}