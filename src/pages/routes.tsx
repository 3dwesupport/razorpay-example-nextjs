// routes.js
import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "@/pages/index";
import OrderSuccessResponse from "@/pages/razorpay/razorpayPayment/orderSuccessResponse";

import OrderResponseFailed from "@/pages/razorpay/razorpayPayment/OrderResponseFailed";
import PaymentGateWay from "@/pages/paymentGateWay";
import PaymentGatewayResponse from "@/pages/paymentGatewayResponse";
import PaytmOrder from "/pages/paytm/paytmPayment/paytmOrder ";
import PaymentLink from "@/pages/paymentLink";
import PaytmTransactionSuccess from "@/pages/paytmTransaction";
import PaytmLink from "@/pages/paytmLink";
import razorpayResponseLink from "@/pages/razorpayResponseLink";
import RazorpayPaymentLink from "@/pages/razorpayPaymentLink";
import CreateOrder from "../pages/razorpay/razorpayPayment/createOrder";
import payment from "@/pages/razorpay/razorpayPayment/payment";
import paymentResponse from "@/pages/razorpay/razorpayPayment/paymentResponse";
import CreateLink from "@/pages/razorpay/razorpayLink/createLink";
import responseRazorpayLink from "@/pages/razorpay/razorpayLink/responseRazorpayLink";
import createPaytmLink from "@/pages/paytm/PaytmLink/createPaytmLink";
import paytmLinkResponse from "@/pages/paytm/PaytmLink/paytmLinkResponse";
import PaytmCreateOrder from "@/pages/paytm/paytmPayment/paytmCreateOrder";
import PaymentFailed from "@/pages/razorpay/razorpayPayment/PaymentFailed";
// import CreateOrder from "@/pages/razorpay/razorpayPayment/createOrder";


// @ts-ignore
const RouterCom = () => (
    <Routes>
        <Route exact path="/" element={Home}/>
        <Route exact path="/pages/razorpay/razorpayPayment/payment" element={payment}/>
        <Route exact path="/pages/razorpay/razorpayPayment/paymentResponse" element={paymentResponse}/>
        <Route exact path="/pages/razorpay/razorpayPayment/orderSuccessResponse" element={OrderSuccessResponse}/>
        <Route exact path="/pages/razorpay/razorpayPayment/createOrder" element={CreateOrder}/>
        <Route exact path="/pages/razorpay/razorpayPayment/OrderResponseFailed" element={OrderResponseFailed}/>
        <Route exact path="/pages/paytm/PaytmLink/createPaytmLink" element={createPaytmLink}/>
        <Route exact path="/pages/paytm/PaytmLink/paytmLinkResponse" element={paytmLinkResponse}/>
        <Route exact path="/pages/razorpay/razorpayLink/createLink" element={CreateLink}/>
        <Route exact path="/pages/razorpay/razorpayLink/responseRazorpayLink" element={responseRazorpayLink}/>
        <Route exact path="@/pages/paytm/paytmPayment/paytmCreateOrder" element={PaytmCreateOrder}/>
        <Route exact path="/pages/razorpay/razorpayPayment/PaymentFailed" element={PaymentFailed}/>
    </Routes>
);

export default RouterCom;