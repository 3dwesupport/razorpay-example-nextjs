// routes.js

import React from "react";
import {Routes, Route} from "react-router-dom";
import Response from "./pages/response"
import Home from "@/pages";
import {PaymentGateWay} from "@/pages/screens/paymentGateWay";

const RouterCom = () => (
    <Routes>
        <Route exact path="/" element={Home}/>
        <Route exact path="/paymentGatway" element={PaymentGateWay}/>
        <Route exact path="/response" element={Response}/>
    </Routes>
);

export default RouterCom;