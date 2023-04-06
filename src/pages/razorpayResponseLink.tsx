import React from "react";
import {useRouter} from "next/router";
import styles from "@/styles/Home.module.css";
const RazorpayLink = () => {
    const router = useRouter();
    let data = router.query;
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.heading}>RazorPay Payment Url</div>
                {Object.keys(data).length > 0 &&
                    <div className={styles.headingFont}>

                        <div className={styles.responseValues}>
                            <div className={styles.values}>
                                <div>Url</div>
                            </div>
                            <div className={styles.values}>
                                <div>:</div>

                            </div>
                            <div className={styles.values}>
                                <div>{data?.short_url}</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
export default RazorpayLink