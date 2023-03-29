import styles from '@/styles/Home.module.css'
import {useRouter} from "next/router";
import React from "react";
import {IoMdArrowBack} from "react-icons/io";
import Image from "next/image";
import backButton from "../../public/backButton.png";

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
    const handleGoHome = async () => {
        await router.replace({
            pathname: "/createOrder",
        });
    }
    return (
        <>
            <div className={styles.backBtnStyle}>
                <Image src={backButton} alt={""}
                       width={40}
                       height={40}
                       onClick={() => router.back()}
                />
            </div>
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
                            onClick={handleGoHome}>Go Back To Home
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderResponseFailed;