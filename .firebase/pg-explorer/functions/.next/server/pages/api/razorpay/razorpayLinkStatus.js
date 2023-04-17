"use strict";
(() => {
var exports = {};
exports.id = 84;
exports.ids = [84];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 377:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ postTransaction)
});

;// CONCATENATED MODULE: external "razorpay/dist/utils/razorpay-utils"
const razorpay_utils_namespaceObject = require("razorpay/dist/utils/razorpay-utils");
;// CONCATENATED MODULE: ./src/pages/api/razorpay/razorpayLinkStatus.ts

const { PrismaClient  } = __webpack_require__(3524);
const prisma = new PrismaClient();
/**
 * return the status of  payment against a payment link
 * @param req
 * @param res
 */ async function postTransaction(req, res) {
    const query = req.query;
    const status = (0,razorpay_utils_namespaceObject.validatePaymentVerification)({
        "payment_link_id": query.razorpay_payment_link_id,
        "payment_id": query.razorpay_payment_id,
        "payment_link_reference_id": query.razorpay_payment_link_reference_id,
        "payment_link_status": query.razorpay_payment_link_status
    }, query.razorpay_signature, "SgtJVdB2M4OnPtaK5SMo205d");
    const currentDate = new Date(Date.now());
    await prisma.Payment_Info.updateMany({
        where: {
            order_id: query.razorpay_payment_link_id // The ID of the row you want to update
        },
        data: {
            paymentStatus: "paid",
            paymentTime: currentDate
        }
    }).then();
    res.status(200).json(status);
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(377));
module.exports = __webpack_exports__;

})();