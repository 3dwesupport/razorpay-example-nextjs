"use strict";
exports.id = 36;
exports.ids = [36];
exports.modules = {

/***/ 318:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ SelectInputBox)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8710);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3__);




/**
 * Render selectInputBox on screen
 * @param props
 * @constructor
 */ const SelectInputBox = (props)=>{
    const { label , defaultValue , items , onFieldChange , selectInputStyle , disabled =false , key  } = props;
    //handle onChange event on select Fields
    const handleOnChange = (e)=>{
        if (onFieldChange) {
            onFieldChange(e);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.FormControl, {
        disabled: disabled,
        style: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default()),
        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default().selectInputBox) + " " + selectInputStyle,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.InputLabel, {
                id: "demo-simple-select-label",
                children: label
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Select, {
                labelId: "demo-simple-select-label",
                id: "demo-simple-select",
                defaultValue: defaultValue,
                label: label,
                onChange: (e)=>handleOnChange(e),
                children: items && items.map((item)=>{
                    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
                        value: item,
                        children: key ? item[key] : item
                    }, item);
                })
            })
        ]
    });
};


/***/ }),

/***/ 6549:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QX": () => (/* binding */ availableGateway),
/* harmony export */   "mV": () => (/* binding */ currencyOptions),
/* harmony export */   "wm": () => (/* binding */ paytmOption),
/* harmony export */   "zP": () => (/* binding */ availableOptions)
/* harmony export */ });
const availableGateway = [
    {
        gateway: "Razorpay"
    },
    {
        gateway: "Paytm"
    }
];
const availableOptions = [
    {
        options: "CreateOrder"
    },
    {
        options: "CompletePayment"
    },
    {
        options: "PaymentLink"
    }
];
const paytmOption = [
    {
        options: "PaytmOrder"
    },
    {
        options: "PaymentLink"
    }
];
const currencyOptions = [
    {
        currency: "INR"
    },
    {
        currency: "USD"
    },
    {
        currency: "EUR"
    },
    {
        currency: "SGD"
    }
];


/***/ })

};
;