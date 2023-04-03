const https = require('https');
const PaytmChecksum = require('paytmchecksum');
export default async function handler(req, res) {
    if (req.method === 'POST') {
        let paytmParams = {};

        paytmParams.body = {
            "mid": "ypMNdG97323946560536",
            "linkType": "FIXED",
            "linkDescription": "Test Payment",
            "linkName": "Test",
            "amount": req.body.amount
        };

        /*
        * Generate checksum by parameters we have in body
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
        */
        PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "SnuVjF30cYhMEv2D").then(async function (checksum) {

            paytmParams.head = {
                "tokenType": "AES",
                "signature": checksum
            };

            let post_data = JSON.stringify(paytmParams);

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
            let post_req = await https.request(options, async function (post_res) {
                post_res.on('data', function (chunk) {
                    response += chunk;
                });

                return post_res.on('end', async  function () {
                    console.log("response for api ::: ===== :::::: ", response)
                    // data += response
                    return response
                });
            });

            console.log("post_req ::: === ", post_req)
            post_req.write(post_data);
            post_req.end();
            res.status(200).json(post_data);
            return post_req
        });
    }
}

