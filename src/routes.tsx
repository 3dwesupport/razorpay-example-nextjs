// routes.js
import React from "react";
import {Routes, Route} from "react-router-dom";
import PaymentGatewayResponse from "./pages/paymentGatewayResponse"
import Home from "@/pages";
import CreateApiResponse from "@/pages/createApiResponse";
import CreateOrder from "@/pages/createOrder";
import PaymentGateWay from "@/pages/paymentGateWay";


const RouterCom = () => (
    <Routes>
        <Route exact path="/" element={Home}/>
        <Route exact path="/paymentGateWay" element={PaymentGateWay}/>
        <Route exact path="/paymentGatewayResponse" element={PaymentGatewayResponse}/>
        <Route exact path="/createApiResponse" element={CreateApiResponse}/>
        <Route exact path="/createOrder" element={CreateOrder}/>
    </Routes>
);

export default RouterCom;