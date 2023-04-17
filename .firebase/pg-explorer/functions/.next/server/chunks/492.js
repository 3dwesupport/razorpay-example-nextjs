"use strict";
exports.id = 492;
exports.ids = [492];
exports.modules = {

/***/ 3492:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "httpRequest": () => (/* binding */ httpRequest),
/* harmony export */   "method": () => (/* binding */ method)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const httpRequest = async (req, url, _method, headers, body, auth = null)=>{
    try {
        // @ts-ignore
        return await (0,axios__WEBPACK_IMPORTED_MODULE_0__["default"])({
            method: _method,
            url: url,
            data: body,
            headers: headers,
            auth: auth
        });
    } catch (error) {
        // @ts-ignore
        if (error.response) {
            console.log({
                "location:": "response data",
                "data": error.response.data
            });
            console.log({
                "location:": "response status",
                "data": error.response.status
            });
            console.log({
                "location:": "response headers",
                "data": error.response.headers
            });
            return {
                data: error.response.data ?? {},
                status: error.response.status
            };
        } else if (error.request) {
            // The request was made but no response was received
            console.log({
                "location:": "request",
                "data": error.request
            });
            return {
                data: "Bad Request",
                status: 400
            };
        }
        // Something happened in setting up the request that triggered an Error
        console.log("Error Message", error.message);
        return {};
    }
};
const method = {
    POST: "post",
    GET: "get",
    PUT: "put",
    DELETE: "delete",
    OPTIONS: "options"
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;