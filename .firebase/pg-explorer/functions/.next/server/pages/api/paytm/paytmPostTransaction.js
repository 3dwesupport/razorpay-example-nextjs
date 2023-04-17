(() => {
var exports = {};
exports.id = 879;
exports.ids = [879,589];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ 5086:
/***/ ((module) => {

"use strict";
module.exports = require("paytmchecksum");

/***/ }),

/***/ 5611:
/***/ ((module) => {

"use strict";
module.exports = import("nanoid");;

/***/ }),

/***/ 5687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 9924:
/***/ ((module) => {

const paytmConfig = {
    mid: "ypMNdG97323946560536",
    key: "SnuVjF30cYhMEv2D",
    website: "DEFAULT",
    NEXT_PUBLIC_HOST: "https://localhost:3000",
    PAYTM_HOST: "https://securegw.paytm.in"
};
module.exports = paytmConfig;


/***/ }),

/***/ 3234:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ paytmPostTransaction)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9924);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5611);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([nanoid__WEBPACK_IMPORTED_MODULE_1__]);
nanoid__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const https = __webpack_require__(5687);
const PaytmChecksum = __webpack_require__(5086);
const { PrismaClient  } = __webpack_require__(3524);
const prisma = new PrismaClient();
/**
 * render the paytm transaction response
 * @param req
 * @param res
 */ async function paytmPostTransaction(req, res) {
    req.body.index_id = (0,nanoid__WEBPACK_IMPORTED_MODULE_1__.nanoid)(10);
    req.body.gateway = "paytm";
    const currentDate = new Date(Date.now());
    const options = {
        index_id: (0,nanoid__WEBPACK_IMPORTED_MODULE_1__.nanoid)(10),
        gateway: req.body.gateway,
        order_id: req.body.ORDERID.toString(),
        paymentStatus: req.body.STATUS,
        amount: parseInt(req.body.TXNAMOUNT),
        currency: req.body.CURRENCY,
        gatewayId: req.body.MID,
        paymentTime: currentDate
    };
    /* initialize an object */ let paytmParams = {};
    /* body parameters */ // @ts-ignore
    paytmParams.body = {
        /* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */ "mid": req.body.MID,
        /* Enter your order id which needs to be check status for */ "orderId": req.body.ORDERID
    };
    /**
     * Generate checksum by parameters we have in body
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */ PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), (_config__WEBPACK_IMPORTED_MODULE_0___default().key)).then(function(checksum) {
        /* head parameters */ // @ts-ignore
        paytmParams.head = {
            /* put generated checksum value here */ "signature": checksum
        };
        /* prepare JSON string for request */ var post_data = JSON.stringify(paytmParams);
        var options = {
            /* for Production */ hostname: "securegw.paytm.in",
            port: 443,
            path: "/v3/order/status",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": post_data.length
            }
        };
        // Set up the request
        var response = "";
        var post_req = https.request(options, function(post_res) {
            post_res.on("data", function(chunk) {
                response += chunk;
            });
            post_res.on("end", function() {
                console.log("Response: ", response);
            });
        });
        // post the data
        post_req.write(post_data);
        post_req.end();
    });
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
    res.status(200).json({
        body: req.body
    });
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
var __webpack_exports__ = (__webpack_exec__(3234));
module.exports = __webpack_exports__;

})();