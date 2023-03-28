import styles from '@/styles/Home.module.css'
import {useRouter} from "next/router";
import React from "react";
import {IoMdArrowBack} from "react-icons/io";

/***
 * render Response of the create order on screen
 * @param params
 * @constructor
 */
const OrderResponseFailed = (params: any) => {
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
                <div className={styles.container}>
                    <div className={styles.heading}>Order Failed!!</div>
                    <div className={styles.object}>
                    {JSON.stringify(data, null, 3)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderResponseFailed;