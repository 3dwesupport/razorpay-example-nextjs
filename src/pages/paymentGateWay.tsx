import React, {useEffect, useState} from "react";
import styles from '@/styles/Home.module.css'
import {Container, createTheme, TextField, ThemeProvider} from "@mui/material";
import {useRouter} from "next/router";
import axios from "axios";
import {Loading} from "@/Component/Loading";
import Image from "next/image";
import backButton from "../../public/backButton.png";

const theme = createTheme();

/**
 * Render Razorpay payment gateway on screen
 * @param params
 * @constructor
 */
const PaymentGateWay = (params: any) => {
    const [orderId, setOrderId] = useState<any>(undefined);
    const [isActive, setActive] = useState(false)
    const [razorpayId, setRazorpayId] = useState<any>(undefined);
    const router = useRouter();
    const data = router.query;

    useEffect(() => {
        setOrderId(data.journey && data.id);
        setRazorpayId(data.journey && data.razorpay_id);
    }, [])

    //handle onclick event on submit button
    const showRazorPay = async () => {
        let data: any;
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        setActive(true)
        const options = {
            razorpay_id: razorpayId, // Enter the Key ID generated from the Dashboard
            order_id: orderId,
            handler: async function (response: any) {
                data = {
                    orderCreationId: orderId,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                await axios.post('/api/razorpayPayment', options).then(async (res: any) => {
                    await router.replace({
                        pathname: "/paymentGatewayResponse",
                        query: data,
                    });
                })

            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    return (
        <div>
            {!isActive && <div className={styles.backBtnStyle}>
                <Image src={backButton} alt={""}
                       width={40}
                       height={40}
                       onClick={() => router.back()}
                />
            </div>
            }
            <div className={styles.main}>
                <ThemeProvider theme={theme}>
                    <Container>
                        {
                            isActive ?
                                <Loading/>
                                :
                                <div className={styles.App}>
                                    <div className={styles.tab}>
                                        <div className={styles.heading}>Payment Gateway For Razorpay Orders</div>
                                        <div className={styles.horizontalLine}></div>
                                        <div className={styles.form}>
                                            <div className={styles.textInput}>
                                                <TextField id="outlined-basic" label="Razorpay Id" variant="outlined"
                                                           value={razorpayId}
                                                           className={styles.input}
                                                           onChange={e => setRazorpayId(e.target.value)}/>
                                            </div>
                                            <div className={styles.textInput}>
                                                <TextField id="outlined-basic" label="Order Id" variant="outlined"
                                                           value={orderId}
                                                           className={styles.input}
                                                           onChange={e => setOrderId(e.target.value)}/>
                                            </div>
                                            <div className={styles.buttonStyle}>
                                                <button className={styles.enabled} onClick={() => showRazorPay()}>Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </Container>
                </ThemeProvider>
            </div>
        </div>
    )
}


function loadScript(src: any) {
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
