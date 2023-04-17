"use strict";
(() => {
var exports = {};
exports.id = 38;
exports.ids = [38,144];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 5611:
/***/ ((module) => {

module.exports = import("nanoid");;

/***/ }),

/***/ 1701:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _pages_api_httpRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3492);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5611);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_api_httpRequest__WEBPACK_IMPORTED_MODULE_0__, nanoid__WEBPACK_IMPORTED_MODULE_1__]);
([_pages_api_httpRequest__WEBPACK_IMPORTED_MODULE_0__, nanoid__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


const { PrismaClient  } = __webpack_require__(3524);
const prisma = new PrismaClient();
/**
 * create Order api for razorpay
 * @param req
 * @param res
 */ async function handler(req, res) {
    const options = req.body;
    let isProcessed = false;
    let isError = "";
    const headers = {
        "Content-Type": "application/json"
    };
    let apiUrl = "https://api.razorpay.com/v1" + "/orders";
    // @ts-ignore
    let result = await (0,_pages_api_httpRequest__WEBPACK_IMPORTED_MODULE_0__.httpRequest)(req, apiUrl, _pages_api_httpRequest__WEBPACK_IMPORTED_MODULE_0__.method.POST, headers, options, {
        username: "rzp_test_XnlOuOZNrannpU",
        password: "tVOBOvJuHEaF7SfLHRhyLFn6"
    });
    options.order_id = (0,nanoid__WEBPACK_IMPORTED_MODULE_1__.nanoid)(10);
    options.gateway = "razorpay";
    const currentDate = new Date(Date.now());
    res.status(200).json(result.data);
    const value = {
        index_id: (0,nanoid__WEBPACK_IMPORTED_MODULE_1__.nanoid)(10),
        gateway: "razorpay",
        order_id: result.data.id,
        paymentStatus: result.data.status,
        amount: req.body.amount / 100,
        currency: req.body.currency,
        gatewayId: "rzp_test_XnlOuOZNrannpU",
        paymentTime: currentDate
    };
    await prisma.Payment_Info.createMany({
        data: [
            value
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
            isProcessed = true;
        }).catch((err)=>{
            console.log("Error in fetching orders: ", err);
            isError = err;
        });
    }).catch((err)=>{
        console.log("Error in creating orders: ", err);
        isError = err;
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
var __webpack_exports__ = __webpack_require__.X(0, [492], () => (__webpack_exec__(1701)));
module.exports = __webpack_exports__;

})();