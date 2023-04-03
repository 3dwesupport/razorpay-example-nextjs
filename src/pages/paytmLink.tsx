import React from "react";
import {useRouter} from "next/router";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const PaytmLink = () => {
    const router = useRouter();
    let data = router.query;
    console.log("response is ::::::::::::::::::::", data)
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.heading}>Payment Url</div>
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
                                {data?.longUrl && <Link href={(data?.longUrl).toString()}></Link>}
                                <div>
                                    {data?.longUrl}
                                </div>
                                <div>{data?.shortUrl}</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
export default PaytmLink