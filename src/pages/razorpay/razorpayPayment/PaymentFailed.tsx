import styles from '../../../styles/Home.module.css'
import {useRouter} from "next/router";
import React from "react";

/***
 * render Response of the create order on screen
 * @param params
 * @constructor
 */
const PaymentFailed = (params: any) => {
    const router = useRouter();
    let data = router.query;
    data.journey = "CreateOrder"

    //Go to Razorpay Home screen
    const handleGoHome = async () => {
        await router.replace({
            pathname: "/razorpay/razorpayPayment/payment",
        });
    }
    return (
        <>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.heading}>Payment Failed</div>
                    <div className={styles.horizontalLine}></div>
                    <div className={styles.responseData}>
                        Your payment has been Failed!
                    </div>
                    <div className={styles.buttonStyle}>
                        <button
                            className={styles.enabled}
                            onClick={handleGoHome}>Home
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentFailed;