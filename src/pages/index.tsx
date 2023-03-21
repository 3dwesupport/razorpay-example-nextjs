import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React, {useEffect, useState} from "react";
// import "./style.css"
import {Button, Container, createTheme, TextField, ThemeProvider} from "@mui/material";
import {useRouter} from "next/router";
import {PaymentGateWay} from "@/pages/screens/paymentGateWay";
import {router} from "next/client";
import {CreateOrder} from "@/pages/screens/createOrder";


const theme = createTheme();

const inter = Inter({subsets: ['latin']})

 export default function Home() {
     // const showPaymentGateway=()=>{
     //     router.push("/");
     // }
    return(
        <>
            {/*<Button onClick={()=>{}}>Create Order</Button>*/}
            {/*<Button onClick={()=>{}}>Complete Payment</Button>*/}
            {/*<PaymentGatway/>*/}
          <CreateOrder/>
        </>
    )
}
