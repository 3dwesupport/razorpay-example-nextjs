"use strict";
(() => {
var exports = {};
exports.id = 201;
exports.ids = [201];
exports.modules = {

/***/ 5086:
/***/ ((module) => {

module.exports = require("paytmchecksum");

/***/ }),

/***/ 5687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 3966:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
const https = __webpack_require__(5687);
const PaytmChecksum = __webpack_require__(5086);
/**
 * handle the paytm transaction
 * @param req
 * @param res
 */ async function handler(req, res) {
    console.log("req.body::::::::::::::", req);
    if (req.method === "POST") {
        let paytmParams = {};
        paytmParams.body = {
            "requestType": "Payment",
            "mid": req.body.mid,
            "websiteName": "WEBSTAGING",
            "orderId": req.body.orderId,
            "callbackUrl": "http://localhost:3000/api/paytm/paytmPostTransaction",
            "txnAmount": {
                "value": req.body.amount,
                "currency": "INR"
            },
            "userInfo": {
                "custId": "CUST_002"
            }
        };
        /*
        * Generate checksum by parameters we have in body
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
        */ const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), req.body.mKey);
        paytmParams.head = {
            "signature": checksum
        };
        var post_data = JSON.stringify(paytmParams);
        const requestAsync = async ()=>{
            return new Promise((resolve, reject)=>{
                var options = {
                    /* for Staging */ hostname: "securegw.paytm.in",
                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${req.body.mid}&orderId=${req.body.orderId}`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Length": post_data.length
                    }
                };
                let response = "";
                let post_req = https.request(options, function(post_res) {
                    post_res.on("data", function(chunk) {
                        response += chunk;
                    });
                    post_res.on("end", function() {
                        console.log("Response: ", response);
                        // resolve(response)
                        resolve(JSON.parse(response).body);
                        console.log("Response: ", JSON.parse(response).body);
                    });
                });
                post_req.write(post_data);
                post_req.end();
                return post_req;
            });
        };
        let result = await requestAsync();
        res.status(200).json(result);
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(3966));
module.exports = __webpack_exports__;

})();