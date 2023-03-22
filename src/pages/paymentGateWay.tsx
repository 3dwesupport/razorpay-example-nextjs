import React, {useEffect, useState} from "react";
import styles from '@/styles/Home.module.css'
import {Button, Container, createTheme, TextField, ThemeProvider} from "@mui/material";
import {useRouter} from "next/router";
import {IoMdArrowBack} from "react-icons/io";

const theme = createTheme();

const PaymentGateWay = (params: any) => {
    const [orderId, setOrderId] = useState<any>(undefined)
    const [razorpayId, setRazorpayId] = useState<any>(undefined);
    const router = useRouter();
    const data = router.query;

    useEffect(() => {
        setOrderId(data.journey && data.id);
        setRazorpayId(data.journey && data.key);
    }, [])

    const showRazorPay = async () => {
        let data;
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        const options = {
            key: razorpayId, // Enter the Key ID generated from the Dashboard
            description: "Test Transaction",
            order_id: orderId,
            handler: async function (response) {
                data = {
                    orderCreationId: orderId,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                await router.replace({
                    pathname: "/paymentGatewayResponse",
                    query: data,
                });
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    return (
        <div className={styles.main}>
            <ThemeProvider theme={theme}>
                <Container>
                    <button className={styles.backButton} onClick={() => router.back()}><IoMdArrowBack size={30}/>
                    </button>
                    <div className={styles.App}>
                        <div className={styles.heading}>Payment Gateway For Razorpay Orders</div>
                        <div className={styles.form}>
                            <div className={styles.textInput}>
                                <TextField id="outlined-basic" label="Razorpay Id" variant="outlined"
                                           value={razorpayId}
                                           onChange={e => setRazorpayId(e.target.value)}/>
                            </div>
                            <div className={styles.textInput}>
                                <TextField id="outlined-basic" label="Order Id" variant="outlined"
                                           value={orderId}
                                           onChange={e => setOrderId(e.target.value)}/>
                            </div>
                            <Button onClick={() => showRazorPay()}>Submit</Button>
                        </div>
                    </div>
                </Container>
            </ThemeProvider>
        </div>
    )
}


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

export default PaymentGateWay
