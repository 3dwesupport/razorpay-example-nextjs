import React from "react";
import {useRouter} from "next/router";
import styles from '@/styles/Home.module.css'

const Response = (params: any) => {
    const router = useRouter();
    console.log("router::", router);
    console.log("router.query", router.query)
    const data = router.query;

    return (
        <div className={styles.main}>
            <div className={styles.heading}>Result</div>
            {JSON.stringify(data, null, 3)}
            <div>
                {Object.keys(data).length > 0 &&
                    <div className={styles.headingFont}>
                        <div>orderCreationId is :   {data?.orderCreationId}</div>
                        <div>razorpayPaymentId is :   {data?.razorpayPaymentId}</div>
                        <div>razorpayPaymentId is :   {data?.razorpayOrderId}</div>
                        <div>razorpaySignature is :   {data?.razorpaySignature}</div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Response;