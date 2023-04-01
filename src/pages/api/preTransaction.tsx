import paytmConfig from "./config";
import {cookies} from "next/headers";

const https = require('https');
const PaytmChecksum = require('paytmchecksum');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let paytmParams = {}

        paytmParams.body = {
            "requestType": "Payment",
            "mid": paytmConfig.mid,
            "websiteName": "WEBSTAGING",
            "orderId": req.body.orderId,
            "callbackUrl": "http://localhost:3000",
            "txnAmount": {
                "value": req.body.amount,
                "currency": "INR",
            },
            "userInfo": {
                "custId": "CUST_002",
            },
        };
        /*
        * Generate checksum by parameters we have in body
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
        */
        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), paytmConfig.key)
        paytmParams.head = {
            "signature": checksum
        };
        var post_data = JSON.stringify(paytmParams);
        const requestAsync = async () => {
            return new Promise((resolve, reject) => {
                var options = {

                    /* for Staging */
                    hostname: 'securegw.paytm.in',
                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${paytmConfig.mid}&orderId=${req.body.orderId}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                let response = "";
                let post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        console.log('Response: ', response);
                        // resolve(response)
                        resolve(JSON.parse(response).body)
                        console.log('Response: ', JSON.parse(response).body);
                    });
                });

                post_req.write(post_data);
                post_req.end();
                return post_req;

            })
        }
        let result = await requestAsync()
        console.log("result is ::::::::::::", result)

        res.status(200).json(result);
    }
}


