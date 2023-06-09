import React from "react";
import {useRouter} from "next/router";
import styles from '@/styles/Home.module.css'

/**
 * Render the Razorpay Payment Response on Screen
 * @param params
 * @constructor
 */
const PaymentResponse = (params: any) => {
    const router = useRouter();
    const data = router.query;

    const handleGoHome = async () => {
        await router.replace({
            pathname: "/razorpay/razorpayPayment/payment",
        });
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.tab}>
                    <div className={styles.heading}>Payment Successful!!</div>
                    <div className={styles.horizontalLine}></div>
                    <div className={styles.responseData}>
                        {JSON.stringify(data, null, 3)}
                    </div>
                    {Object.keys(data).length > 0 &&
                        <div className={styles.headingFont}>
                            <div className={styles.responseValues}>
                                <div className={styles.values}>
                                    <div>OrderCreationId</div>
                                    <div>RazorpayPaymentId</div>
                                    <div>RazorpayPaymentId</div>
                                    <div>RazorpaySignature</div>
                                </div>
                                <div className={styles.values}>
                                    <div>:</div>
                                    <div>:</div>
                                    <div>:</div>
                                    <div>:</div>
                                </div>
                                <div className={styles.values}>
                                    <div>{data?.orderCreationId}</div>
                                    <div>{data?.razorpayPaymentId}</div>
                                    <div>{data?.currency}</div>
                                    <div>{data?.razorpayOrderId}</div>
                                    <div>{data?.razorpaySignature}</div>
                                </div>
                            </div>
                        </div>
                    }
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
export default PaymentResponse;