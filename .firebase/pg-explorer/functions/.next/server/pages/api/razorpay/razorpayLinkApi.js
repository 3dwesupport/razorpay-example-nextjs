"use strict";
(() => {
var exports = {};
exports.id = 290;
exports.ids = [290];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 4871:
/***/ ((module) => {

module.exports = require("razorpay");

/***/ }),

/***/ 5611:
/***/ ((module) => {

module.exports = import("nanoid");;

/***/ }),

/***/ 9650:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var razorpay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var razorpay__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(razorpay__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5611);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3524);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([nanoid__WEBPACK_IMPORTED_MODULE_1__]);
nanoid__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_2__.PrismaClient();
/**
 * create link api for razorpay
 * @param req
 * @param res
 */ async function handler(req, res) {
    var instance = new (razorpay__WEBPACK_IMPORTED_MODULE_0___default())({
        key_id: "rzp_test_SDSHr77Ftm5eIV",
        key_secret: "SgtJVdB2M4OnPtaK5SMo205d"
    });
    const requestAsync = async ()=>{
        return new Promise((resolve, reject)=>{
            let localData = instance.paymentLink.create({
                amount: req.body.amount,
                currency: req.body.currency,
                accept_partial: true,
                first_min_partial_amount: 100,
                description: req.body.description,
                customer: {
                    name: req.body.username,
                    email: req.body.email,
                    contact: req.body.mobileNo
                },
                notify: {
                    sms: true,
                    email: true
                },
                reminder_enable: true,
                notes: {
                    policy_name: "Jeevan Bima"
                },
                callback_url: "http://localhost:3000/api/razorpay/razorpayLinkStatus",
                callback_method: "get"
            });
            resolve(localData);
        });
    };
    const currentDate = new Date(Date.now());
    let result = await requestAsync();
    // @ts-ignore
    const data = {
        amount: req.body.amount / 100,
        currency: req.body.currency,
        index_id: (0,nanoid__WEBPACK_IMPORTED_MODULE_1__.nanoid)(10),
        gatewayId: req.body.gatewayId,
        gateway: "razorpay",
        paymentStatus: result.status,
        order_id: result.id,
        paymentTime: currentDate
    };
    // @ts-ignore
    await prisma.Payment_Info.createMany({
        data: [
            data
        ]
    }).then(async (res)=>{
        console.log("Created", res.count, "order");
        // @ts-ignore
        await prisma.Payment_Info.findMany({
            orderBy: {
                order_id: "desc"
            }
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log("Error in fetching orders: ", err);
        });
    }).catch((err)=>{
        console.log("Error in creating orders: ", err);
    });
    res.status(200).json(result);
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
var __webpack_exports__ = (__webpack_exec__(9650));
module.exports = __webpack_exports__;

})();