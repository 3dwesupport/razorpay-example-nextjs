import React from "react";
import {useRouter} from "next/router";
import styles from '@/styles/Home.module.css'
import {IoMdArrowBack} from "react-icons/io";
import Image from "next/image";
import backButton from "../../public/backButton.png";

const PaymentGatewayResponse = (params: any) => {
    const router = useRouter();
    const data = router.query;

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
                </div>
            </div>
        </>
    );
};
export default PaymentGatewayResponse;