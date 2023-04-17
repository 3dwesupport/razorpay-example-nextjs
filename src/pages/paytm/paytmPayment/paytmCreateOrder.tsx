import React, {useState} from "react";
import styles from "@/styles/Home.module.css";
import paytmConfig from "../.././api/config";
import {Loading} from "@/Component/loading";
import {Amount, Mid, MKey} from "@/Component/razorpay/formComponent";
import {PaytmLogo} from "@/Component/paytm/paytmLogo";

/**
 * Render the form to create the Paytm order
 * @constructor
 */
const PaytmCreateOrder = () => {
    const [amount, setAmount] = useState("")
    const [isActive, setIsActive] = useState(false)
    const [mid, setMid] = useState("")
    const [mKey, setMKey] = useState("")
    const [error, setError] = useState(false)

    //render the paytm payment gateway
    const showPaytm = async () => {
        setError(true)
        setIsActive(true)
        const value = await loadScript(`${paytmConfig.PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${paytmConfig.mid}.js`)
        if (!value) {
            alert("Paytm SDK failed to load. Are you online?");
            return;
        }
        let orderId = Math.floor(Math.random() * Date.now());
        const data = {amount, orderId, mid,mKey};
        let res = await fetch("/api/paytm/paytmPreTransaction", {
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
                "amount": parseInt(amount) /* update amount */
            },
            "handler": {
                "notifyMerchant": function (eventName: any, data: any) {
                    console.log("eventName => ", eventName);
                    console.log("data => ", data);
                }
            }
        };
        // @ts-ignore
        if (window.Paytm && window.Paytm.CheckoutJS) {
            // @ts-ignore
            window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
                // initialize configuration using init method
                // @ts-ignore
                window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                    // after successfully updating configuration, invoke JS Checkout
                    // @ts-ignore
                    window.Paytm.CheckoutJS.invoke();
                }).catch(function onError(error: any) {
                });
            });
        }
    }
    //handle amount validation
    const handleAmount = (e: any) => {
        const input = e.target.value;
        const regex = /^\d+(\.\d{0,9})?$/; // pattern for numeric and decimal values
        if (regex.test(input) || input === '') {
            setAmount(input);
        }
    }
    //handle disabled submit button
    const handleDisabled = () => {
        return !(amount && mid.length >= 20);
    }
    return (
        <div className={styles.main}>
            {
                isActive ?
                    <Loading/>
                    :
                    <div className={styles.mainContainer}>
                        <PaytmLogo/>
                        <div className={styles.App}>
                            <div className={styles.tab}>
                                <div className={styles.heading}>Create Order</div>
                                <div className={styles.horizontalLine}></div>
                                <div className={styles.form}>
                                    <div className={styles.textInput}>
                                        <Mid
                                            mid={mid}
                                            setMid={setMid}
                                            error={error}/>
                                        <MKey
                                            mkey={mKey}
                                            setMKey={setMKey}
                                            error={error}/>
                                        <Amount
                                            amount={amount}
                                            handleAmount={handleAmount}/>
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
                    </div>
            }
        </div>
    )
}

/**
 * Load the script of the paytm
 * @param src
 */
function loadScript(src: any) {
    return new Promise((resolve: any) => {
        if (typeof window !== 'undefined') {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        }
    });
}

export default PaytmCreateOrder

