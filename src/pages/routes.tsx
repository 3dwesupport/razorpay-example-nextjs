// routes.js
import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
// @ts-ignore
import Home from "@/pages/index";
import OrderSuccessResponse from "@/pages/razorpay/razorpayPayment/orderSuccessResponse";
import OrderResponseFailed from "@/pages/razorpay/razorpayPayment/OrderResponseFailed";
import CreateOrder from "../pages/razorpay/razorpayPayment/createOrder";
import CreateLink from "@/pages/razorpay/razorpayLink/createLink";
import PaymentFailed from "@/pages/razorpay/razorpayPayment/PaymentFailed";
import Payment from "@/pages/razorpay/razorpayPayment/payment";
import PaymentResponse from "@/pages/razorpay/razorpayPayment/paymentResponse";
import CreatePaytmLink from "@/pages/paytm/PaytmLink/createPaytmLink";
import PaytmLinkResponse from "@/pages/paytm/PaytmLink/paytmLinkResponse";
import ResponseRazorpayLink from "@/pages/razorpay/razorpayLink/responseRazorpayLink";
import PaytmCreateOrder from "@/pages/paytm/paytmPayment/paytmCreateOrder";

const RouterCom = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/pages/razorpay/razorpayPayment/payment" element={<Payment/>}/>
            <Route path="/pages/razorpay/razorpayPayment/paymentResponse" element={<PaymentResponse/>}/>
            <Route path="/pages/razorpay/razorpayPayment/orderSuccessResponse" element={<OrderSuccessResponse/>}/>
            <Route path="/pages/razorpay/razorpayPayment/createOrder" element={<CreateOrder/>}/>
            <Route path="/pages/razorpay/razorpayPayment/OrderResponseFailed" element={<OrderResponseFailed/>}/>
            <Route path="/pages/paytm/PaytmLink/createPaytmLink" element={<CreatePaytmLink/>}/>
            <Route path="/pages/paytm/PaytmLink/paytmLinkResponse" element={<PaytmLinkResponse/>}/>
            <Route path="/pages/razorpay/razorpayLink/createLink" element={<CreateLink/>}/>
            <Route path="/pages/razorpay/razorpayLink/responseRazorpayLink" element={<ResponseRazorpayLink/>}/>
            <Route path="@/pages/paytm/paytmPayment/paytmCreateOrder" element={<PaytmCreateOrder/>}/>
            <Route path="/pages/razorpay/razorpayPayment/PaymentFailed" element={<PaymentFailed/>}/>
        </Routes>
    </BrowserRouter>
);

export default RouterCom;