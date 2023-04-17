"use strict";
(() => {
var exports = {};
exports.id = 656;
exports.ids = [656];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 5611:
/***/ ((module) => {

module.exports = import("nanoid");;

/***/ }),

/***/ 3231:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5611);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([nanoid__WEBPACK_IMPORTED_MODULE_0__]);
nanoid__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { PrismaClient  } = __webpack_require__(3524);
const prisma = new PrismaClient();
/**
 * update the paytm status of the transaction in database
 * @param req
 * @param res
 */ async function handler(req, res) {
    const options = req.body;
    options.index_id = (0,nanoid__WEBPACK_IMPORTED_MODULE_0__.nanoid)(10);
    options.gateway = "razorpay";
    const currentDate = new Date(Date.now());
    res.status(200).json(options);
    await prisma.Payment_Info.updateMany({
        where: {
            order_id: req.body.order_id
        },
        data: {
            paymentStatus: "paid",
            paymentTime: currentDate
        }
    }).then();
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
var __webpack_exports__ = (__webpack_exec__(3231));
module.exports = __webpack_exports__;

})();