import React from "react";
import {useRouter} from "next/router";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const PaytmLinkResponse = () => {
    const router = useRouter();
    let data = router.query;
    return (

        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.heading}>Payment Url</div>
                <div className={styles.responseData}>
                    {JSON.stringify(data, null, 3)}
                </div>
                {Object.keys(data).length > 0 &&
                    <div className={styles.headingFont}>

                        <div className={styles.responseValues}>
                            <div className={styles.values}>
                                <div>LongUrl</div>
                                <div>ShortUrl</div>
                            </div>
                            <div className={styles.values}>
                                <div>:</div>
                                <div>:</div>

                            </div>
                            <div className={styles.values}>
                                <div onClick={() => window.open(data?.longUrl)}> {data?.longUrl}</div>
                                <div onClick={() => window.open(data?.shortUrl)}> {data?.shortUrl}</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
export default PaytmLinkResponse