import styles from '@/styles/Home.module.css'
import {useRouter} from "next/router";
import React from "react";
import {IoMdArrowBack} from "react-icons/io";

/***
 * render Response of the create order on screen
 * @param params
 * @constructor
 */
const CreateOrderResponse = (params: any) => {
    const router = useRouter();
    let data = router.query;
    data.journey = "CreateOrder"
    const showPaymentGateway = async () => {
        await router.push({
            pathname: "/paymentGateWay",
            query: data
        });
    }
    return (
        <>
            <button className={"styles.backButton"} onClick={() => router.back()}><IoMdArrowBack size={30}/></button>
            <div className={styles.main}>
                <div className={styles.tab}>
                    <div className={styles.heading}>Order Successful!!</div>
                    {JSON.stringify(data, null, 3)}
                    <div>
                        {Object.keys(data).length > 0 &&
                            <div className={styles.headingFont}>
                                <div>Amount is : {data?.amount}</div>
                                <div>Currency is : {data?.currency}</div>
                                <div>Receipt is : {data?.receipt}</div>
                                <div>RazorpayId is : {data?.razorpay_id}</div>
                                <div>orderId is : {data?.id}</div>
                            </div>
                        }
                    </div>
                    <button className={styles.enabled}
                            onClick={showPaymentGateway}>Complete Payment
                    </button>
                </div>
            </div>
        </>
    );
};

export default CreateOrderResponse;