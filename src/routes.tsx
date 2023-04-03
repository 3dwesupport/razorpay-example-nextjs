// routes.js
import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "@/pages";
import CreateOrderResponse from "@/pages/createOrderResponse";
import CreateOrder from "@/pages/createOrder";
import OrderResponseFailed from "@/pages/OrderResponseFailed";
import PaymentGateWay from "@/pages/paymentGateWay";
import PaymentGatewayResponse from "@/pages/paymentGatewayResponse";
import PaytmPayment from "@/pages/paytmPayment ";
import PaymentLink from "@/pages/paymentLink";


const RouterCom = () => (
    <Routes>
        <Route exact path="/" element={Home}/>
        <Route exact path="/paymentGateWay" element={PaymentGateWay}/>
        <Route exact path="/paymentGatewayResponse" element={PaymentGatewayResponse}/>
        <Route exact path="/createOrderResponse" element={CreateOrderResponse}/>
        <Route exact path="/createOrder" element={CreateOrder}/>
        <Route exact path="/OrderResponseFailed" element={OrderResponseFailed}/>
        <Route exact path="/paytmPayment" element={PaytmPayment}/>
        <Route exact path="/paymentLink" element={PaymentLink}/>
    </Routes>
);

export default RouterCom;