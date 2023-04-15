import styles from '@/styles/Home.module.css'
import {useRouter} from "next/router";
import React from "react";

/***
 * render Response of the create order on screen
 * @param params
 * @constructor
 */
const OrderResponseFailed = (params: any) => {
    const router = useRouter();
    let data = router.query;
    data.journey = "CreateOrder"

    //Go to Razorpay Home screen
    const handleGoHome = async () => {
        await router.replace({
            pathname: "/razorpay/razorpayPayment/createOrder",
        });
    }
    return (
        <>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.heading}>Order Failed</div>
                    <div className={styles.horizontalLine}></div>
                    <div className={styles.responseData}>
                        <div className={styles.object}>
                            {JSON.stringify(data, null, 3)}
                        </div>
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

export default OrderResponseFailed;