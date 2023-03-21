import styles from '@/styles/Home.module.css'
import {useRouter} from "next/router";
import {Button} from "@mui/material";
import React from "react";

const CreateApiResponse = (params: any) => {
    const router = useRouter();
    const data = router.query;

    const showPaymentGateway = async () => {
        await router.push({
            pathname: "/paymentGateWay",
        });
    }
    return (
        <div className={styles.main}>
            <div className={styles.heading}>Success</div>
            {JSON.stringify(data, null, 3)}
            <div>
                {Object.keys(data).length > 0 &&
                    <div className={styles.headingFont}>
                        <div>Amount is : {data?.amount}</div>
                        <div>Currency is : {data?.currency}</div>
                        <div>Receipt is : {data?.receipt}</div>
                        <div>OrderID is : {data?.id}</div>
                    </div>
                }
            </div>
            <Button onClick={showPaymentGateway}>Complete Payment</Button>
        </div>
    );
};

export default CreateApiResponse;