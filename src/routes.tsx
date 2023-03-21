// routes.js
import React from "react";
import {Routes, Route} from "react-router-dom";
import PaymentGatewayResponse from "./pages/screens/paymentGatewayResponse"
import Home from "@/pages";
import CreateApiResponse from "@/pages/screens/createApiResponse";
import CreateOrder from "@/pages/screens/createOrder";
import PaymentGateWay from "@/pages/screens/paymentGateWay";


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