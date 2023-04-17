"use strict";
(() => {
var exports = {};
exports.id = 363;
exports.ids = [363];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 5086:
/***/ ((module) => {

module.exports = require("paytmchecksum");

/***/ }),

/***/ 5611:
/***/ ((module) => {

module.exports = import("nanoid");;

/***/ }),

/***/ 5687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 7460:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5611);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([nanoid__WEBPACK_IMPORTED_MODULE_0__]);
nanoid__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const { PrismaClient  } = __webpack_require__(3524);
const prisma = new PrismaClient();
const https = __webpack_require__(5687);
const PaytmChecksum = __webpack_require__(5086);
/**
 * response of the paytm payment link
 * @param req
 * @param res
 */ async function handler(req, res) {
    if (req.method === "POST") {
        let paytmParams = {};
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
        */ const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "SnuVjF30cYhMEv2D");
        // @ts-ignore
        paytmParams.head = {
            "tokenType": "AES",
            "signature": checksum
        };
        let post_data = JSON.stringify(paytmParams);
        const requestAsync = async ()=>{
            return new Promise((resolve, reject)=>{
                let options = {
                    /* for Production */ hostname: "securegw.paytm.in",
                    port: 443,
                    path: "/link/create",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Length": post_data.length
                    }
                };
                let response = "";
                let post_req = https.request(options, async function(post_res) {
                    post_res.on("data", function(chunk) {
                        response += chunk;
                    });
                    return post_res.on("end", async function() {
                        // data += response
                        resolve(JSON.parse(response).body);
                    });
                });
                post_req.write(post_data);
                post_req.end();
            });
        };
        const currentDate = new Date(Date.now());
        const requestAsyncStatus = requestAsync().then((res)=>{
            return res.linkId.toString();
        });
        let result = await requestAsync();
        const options = {
            amount: parseInt(req.body.amount),
            currency: "INR",
            gateway: "paytm",
            index_id: (0,nanoid__WEBPACK_IMPORTED_MODULE_0__.nanoid)(10),
            gatewayId: req.body.mid,
            paymentStatus: "created",
            order_id: requestAsyncStatus,
            paymentTime: currentDate
        };
        await prisma.Payment_Info.createMany({
            data: [
                options
            ]
        }).then(async (res)=>{
            console.log("Created", res.count, "order");
            await prisma.Payment_Info.findMany({
                orderBy: {
                    order_id: "desc"
                }
            }).then((res)=>{
                console.log("Fetched orders details sorted by orders IDs -");
                console.log(res);
            }).catch((err)=>{
                console.log("Error in fetching orders: ", err);
            });
        }).catch((err)=>{
            console.log("Error in creating orders: ", err);
        });
        res.status(200).json(result);
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(7460));
module.exports = __webpack_exports__;

})();