import styles from '@/styles/Home.module.css'
import {useRouter} from "next/router";
import React from "react";
/***
 * render Response of the order on screen
 * @param params
 * @constructor
 */
const OrderSuccessResponse = (params: any) => {
    const router = useRouter();
    let data = router.query;
    data.journey = "CreateOrder"

    //render the screen of the razorpay payment
    const showPaymentGateway = async () => {
        await router.push({
            pathname: "/razorpay/razorpayPayment/payment",
            query: data
        });
    }
    // @ts-ignore
    return (
        <>
            <div className={styles.main}>
                <div className={styles.tab}>
                    <div className={styles.heading}>Order Successful!</div>
                    <div className={styles.horizontalLine}></div>
                    <div className={styles.responseData}>
                        {JSON.stringify(data, null, 3)}
                    </div>
                    {Object.keys(data).length > 0 &&
                        <div className={styles.headingFont}>
                            <div className={styles.responseValues}>
                                <div className={styles.values}>
                                    <div>Razorpay Id</div>
                                    <div>Amount</div>
                                    <div>Currency</div>
                                    <div>Receipt</div>
                                    <div>Order ID</div>
                                </div>
                                <div className={styles.values}>
                                    <div>:</div>
                                    <div>:</div>
                                    <div>:</div>
                                    <div>:</div>
                                    <div>:</div>
                                </div>
                                <div className={styles.values}>
                                    <div>{data?.razorpay_id}</div>
                                    <div>{data?.amount/100}</div>
                                    <div>{data?.currency}</div>
                                    <div>{data?.receipt}</div>
                                    <div>{data?.id}</div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className={styles.buttonStyle}>
                        <button className={styles.enabled}
                                onClick={showPaymentGateway}>Complete Payment
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
        ;
};

export default OrderSuccessResponse;