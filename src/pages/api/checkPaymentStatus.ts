const https = require('https');
/*
* import checksum generation utility
* You can get this utility from https://developer.paytm.com/docs/checksum/
*/

const PaytmChecksum = require('paytmchecksum');
export default async function handler(req: any, res: any) {
    // var paytmParams = {};
    //
    // paytmParams.body = {
    //     "mid": "ypMNdG97323946560536",
    //     "linkId": req.body.linkId,
    // };
    //
    // /*
    // * Generate checksum by parameters we have in body
    // * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
    // */
    // const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "SnuVjF30cYhMEv2D")
    //
    // paytmParams.head = {
    //     "tokenType": "AES",
    //     "signature": checksum
    // };
    // console.log("paytmParams:::::::::::::::::::::",paytmParams)
    //
    // let post_data = JSON.stringify(paytmParams);
    // const requestAsync = async () => {
    //     return new Promise((resolve, reject) => {
    //
    //         let options = {
    //             /* for Production */
    //             hostname: 'securegw.paytm.in',
    //
    //             port: 443,
    //             path: '/link/fetchTransaction',
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Content-Length': post_data.length
    //             }
    //         };
    //
    //         let response = "";
    //         // let data
    //         let post_req = https.request(options, async function (post_res: any) {
    //             post_res.on('data', function (chunk: any) {
    //                 response += chunk;
    //             });
    //
    //             return post_res.on('end', async function () {
    //                 // data += response
    //                 console.log("value of the response is :;;::::::::::::",response)
    //                 resolve(response)
    //             });
    //         });
    //         post_req.write(post_data);
    //         post_req.end();
    //     });
    //
    // }
    // let result = await requestAsync()
    // // res.status(200).json(result);
    // res.status(200).json({body: result})
}

