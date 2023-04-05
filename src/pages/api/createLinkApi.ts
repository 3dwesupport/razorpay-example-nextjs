const https = require('https');
const PaytmChecksum = require('paytmchecksum');
export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        let paytmParams = {};

        paytmParams.body = {
            "mid": "ypMNdG97323946560536",
            "linkType": "FIXED",
            "linkDescription": "Test Payment",
            "linkName": "Test",
            "amount": req.body.amount,
            "statusCallbackUrl": "http://localhost:3000/api/checkPaymentStatus"
        };

        /*
        * Generate checksum by parameters we have in body
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
        */
        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "SnuVjF30cYhMEv2D")

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
                // let data
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
        let result = await requestAsync()
        res.status(200).json(result);
    }
}

