import React, {useState} from "react";
import styles from "@/styles/Home.module.css";
import paytmConfig from "././api/config";
import {TextField} from "@mui/material";
import {Loading} from "@/Component/Loading";

const PaytmOrder = () => {
    const [amount, setAmount] = useState("")
    const [isActive, setIsActive] = useState(false)
    const showPaytm = async () => {
        setIsActive(true)
        const value = await loadScript(`${paytmConfig.PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${paytmConfig.mid}.js`)
        if (!value) {
            alert("Paytm SDK failed to load. Are you online?");
            return;
        }

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
                "notifyMerchant": function (eventName: any, data: any) {
                    console.log("notifyMerchant handler function called");
                    console.log("eventName => ", eventName);
                    console.log("data => ", data);
                }
            }
        };
        if (window.Paytm && window.Paytm.CheckoutJS) {
            window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
                // initialize configuration using init method
                window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                    // after successfully updating configuration, invoke JS Checkout
                    window.Paytm.CheckoutJS.invoke();
                }).catch(function onError(error: any) {
                    console.log("error => ", error);
                });
            });
        }

    }
    const handleAmount = (e) => {
        const input = e.target.value;
        const regex =  /^\d+(\.\d{0,9})?$/; // pattern for numeric and decimal values
        if (regex.test(input) || input === '') {
            setAmount(input);
        }
    }
    const handleDisabled = () => {
        return !(amount);
    }
    return (
        <div className={styles.main}>
            {
                isActive ?
                    <Loading/>
                    :

                    <div className={styles.App}>
                        <div className={styles.tab}>
                            <div className={styles.heading}>Create Order</div>
                            <div className={styles.horizontalLine}></div>
                            <div className={styles.form}>
                                <div className={styles.textInput}>
                                    <TextField id="outlined-basic" label="Amount" variant="outlined"
                                               value={amount}
                                               className={styles.input}
                                               onChange={handleAmount}/>
                                </div>
                                <div className={styles.buttonStyle}>
                                <button disabled={handleDisabled()}
                                        className={`${handleDisabled() ? styles.btn : styles.enabled}`}
                                        onClick={() => showPaytm()}>Create Order
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

function loadScript(src: any) {
    return new Promise((resolve: any) => {
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

export default PaytmOrder