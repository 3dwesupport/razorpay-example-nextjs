import React, {useEffect, useState} from "react";
import styles from '@/styles/Home.module.css'
import {Container, createTheme, TextField, ThemeProvider} from "@mui/material";
import {useRouter} from "next/router";
import axios from "axios";
import {Loading} from "@/Component/loading";
import {RazorpayLogo} from "@/Component/razorpay/razorpayForm";

const theme = createTheme();

/**
 * Render Razorpay payment gateway on screen
 * @param params
 * @constructor
 */
const Payment = (params: any) => {
    const [orderId, setOrderId] = useState<any>(undefined);
    const [isActive, setActive] = useState(false)
    const [razorpayId, setRazorpayId] = useState<any>("");
    const router = useRouter();
    const dataValue: any = router.query;
    const [error, setError] = useState<any>(false)

    useEffect(() => {
        setOrderId(dataValue.journey && dataValue.id);
        setRazorpayId(dataValue.journey && dataValue.razorpay_id);
    }, [dataValue])

    //handle onClick Disabled
    const handleDisabled = () => {
        return !(razorpayId?.length >= 18 && orderId?.length >= 10);
    }

    //handle onclick event on submit button
    const showRazorPay = async () => {
        setError(true)
        let data: any;
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        const options = {
            gatewayId: razorpayId, // Enter the Key ID generated from the Dashboard
            order_id: orderId,
            amount: parseInt(dataValue.amount),
            currency: dataValue.currency,
            handler: async function (response: any) {
                data = {
                    orderCreationId: orderId,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                await axios.post('/api/razorpay/razorpayPayment', options).then(async (res: any) => {
                    await router.replace({
                        pathname: "/razorpay/razorpayPayment/paymentResponse",
                        query: data,
                    });
                })

            },
            "modal": {
                "ondismiss": function () {
                    window.location.replace("/razorpay/razorpayPayment/PaymentFailed");
                }
            }
        };
        setActive(true)
        // @ts-ignore
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div>
            <div className={styles.main}>
                <ThemeProvider theme={theme}>
                    <Container>
                        {
                            isActive ?
                                <Loading/>
                                :
                                <div className={styles.mainContainer}>
                                    <RazorpayLogo/>
                                    <div className={styles.App}>
                                        <div className={styles.tab}>
                                            <div className={styles.heading}>Payment Gateway</div>
                                            <div className={styles.horizontalLine}></div>
                                            <div className={styles.form}>
                                                <div className={styles.textInput}>
                                                    <TextField id="outlined-basic" label="Razorpay Id"
                                                               variant="outlined"
                                                               value={razorpayId}
                                                               className={styles.input}
                                                               onChange={e => setRazorpayId(e.target.value)}/>
                                                </div>
                                                {!error && (razorpayId?.length <= 18 && razorpayId?.length != 0) ?
                                                    <label className={styles.error}>Enter a valid RazorpayId
                                                    </label> : ""
                                                }
                                                <div className={styles.textInput}>
                                                    <TextField id="outlined-basic" label="Order Id" variant="outlined"
                                                               value={orderId}
                                                               className={styles.input}
                                                               onChange={e => setOrderId(e.target.value)}/>

                                                </div>
                                                {!error && (orderId?.length < 10 && orderId?.length != 0) ?
                                                    <label className={styles.error}>Enter a valid OrderId
                                                    </label> : ""
                                                }
                                                <div className={styles.buttonStyle}>
                                                    <button disabled={handleDisabled()}
                                                            className={`${handleDisabled() ? styles.btn : styles.enabled}`}
                                                            onClick={() => showRazorPay()}>Submit
                                                    </button>
                                                </div>
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

//Render the script of the razorpay
export function loadScript(src: any) {
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

export default Payment
