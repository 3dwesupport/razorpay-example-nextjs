import React, {useState} from "react";
import styles from "@/styles/Home.module.css";
import paytmConfig from "././api/config";
import {TextField} from "@mui/material";


const PaytmPayment = () => {
    const [amount, setAmount] = useState("")
    // const [mid, setMid] = useState(undefined);
    const showPaytm = async () => {
        const value = await loadScript(`${paytmConfig.PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${paytmConfig.mid}.js`)
        if (!value) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        let amount = 1;
        let orderId = Math.floor(Math.random() * Date.now());
        const data = {amount, orderId};
        let res = await fetch("/api/preTransaction", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        let txnResponse = await res.json()
        let txnToken = txnResponse.txnToken
        console.log("value is ::::::::::::::::", txnResponse)
        const config = {
            "root": "",
            "flow": "DEFAULT",
            "data": {
                "orderId": orderId,/* update order id */
                "token": txnToken, /* update token value */
                "tokenType": "TXN_TOKEN",
                "amount": amount /* update amount */
            },
            "handler": {
                "notifyMerchant": function (eventName, data) {
                    console.log("notifyMerchant handler function called");
                    console.log("eventName => ", eventName);
                    console.log("data => ", data);
                }
            }
        };
        if (window.Paytm && window.Paytm.CheckoutJS) {
            window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
                // initialze configuration using init method
                window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                    // after successfully updating configuration, invoke JS Checkout
                    window.Paytm.CheckoutJS.invoke();
                }).catch(function onError(error) {
                    console.log("error => ", error);
                });
            });
        }

    }
    return (
        <div className={styles.main}>
            <div className={styles.App}>
                <div className={styles.tab}>
                    <div className={styles.heading}>Create Order</div>
                    <div className={styles.horizontalLine}></div>
                    <div className={styles.form}>
                        <div className={styles.textInput}>
                            <TextField id="outlined-basic" label="Amount" variant="outlined"
                                       value={amount}
                                       className={styles.input}
                                       onChange={e => setAmount(e.target.value)}/>
                        </div>
                        <div className={styles.buttonStyle}>
                            <button className={styles.enabled} onClick={() => showPaytm()}>Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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

export default PaytmPayment