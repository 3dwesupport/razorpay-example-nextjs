"use strict";
exports.id = 677;
exports.ids = [677];
exports.modules = {

/***/ 2789:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/Razorpay.61882187.png","height":4000,"width":4000,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAV1BMVEX////+/v7+/v79/f37+/z////+/v7+/v79/v79/f7////////+/v739/j09vrz8/Tq7PD////+/v7q6+3p6uvo6erg4eHc3uDb3N3X3ObZ2t3X2NvL1ebnFAE2AAAAEXRSTlMAACkpKcLC7u7u+fr6+vr6+sd0vjUAAABASURBVHjaY2BgYuPhYWNiZGDmEAICdmYGVkEuQSBiZeCTERMWERHlZRCQlBAXl5LmR0ixcEIVMzKxcfOwMTEAAHCZAyLOtx+UAAAAAElFTkSuQmCC","blurWidth":8,"blurHeight":8});

/***/ }),

/***/ 5677:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "U": () => (/* binding */ RazorpayLogo),
/* harmony export */   "w": () => (/* binding */ CreateOrderForm)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8710);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _public_Razorpay_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2789);
/* harmony import */ var _Component_razorpay_formComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9252);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);






/**
 * render the form component of create order
 * @param params
 * @constructor
 */ const CreateOrderForm = (params)=>{
    const { razorpayId , setRazorpayId , error , amount , handleAmount , currency , handleCurrency , receipt , setReceipt , handleDisabled , handleCreateOrder  } = params;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().mainContainer),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RazorpayLogo, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().App),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().tab),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().heading),
                            children: "Create Order"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().horizontalLine)
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().form),
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().textInput),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Component_razorpay_formComponent__WEBPACK_IMPORTED_MODULE_3__/* .RazorpayId */ .EJ, {
                                            razorpayId: razorpayId,
                                            setRazorpayId: setRazorpayId,
                                            error: error
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Component_razorpay_formComponent__WEBPACK_IMPORTED_MODULE_3__/* .Amount */ .$d, {
                                            amount: amount,
                                            handleAmount: handleAmount
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Component_razorpay_formComponent__WEBPACK_IMPORTED_MODULE_3__/* .Currency */ .F, {
                                            currency: currency,
                                            handleCurrency: handleCurrency
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Component_razorpay_formComponent__WEBPACK_IMPORTED_MODULE_3__/* .Receipt */ .wS, {
                                            reciept: receipt,
                                            setReceipt: setReceipt,
                                            error: error
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().buttonStyle),
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        disabled: handleDisabled(),
                                        className: `${handleDisabled() ? (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().btn) : (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().enabled)}`,
                                        onClick: handleCreateOrder,
                                        children: "Create Order"
                                    })
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
};
/**
 * Render the razorpay logo on screen
 * @constructor
 */ const RazorpayLogo = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().LeftDiv),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().image),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                    src: _public_Razorpay_png__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z,
                    alt: "Picture of the Logo",
                    className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().razorpayImage)
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().text),
                children: "Test Razorpay Gateway"
            })
        ]
    });
};


/***/ })

};
;