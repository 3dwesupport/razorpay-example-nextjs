import styles from "@/styles/Home.module.css";
import {TextField} from "@mui/material";
import React, {useState} from "react";
import {useRouter} from "next/router";

const PaymentLink = () => {
    const [userData, setUserData] = useState({})
    const router = useRouter();

    const createPaytmLink = async () => {
        let res = await fetch("/api/createLinkApi", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
        if (res) {
            console.log("response for Payment link is created successfully ::: ", res)
            await res.json().then((res) => {
                console.log("response inside ::: ", res)
                router.push({
                    pathname: "/paytmLink",
                    query: res,
                });

            })
        }
    }
    return (
        <div className={styles.main}>
            <div className={styles.App}>
                <div className={styles.tab}>
                    <div className={styles.heading}>Create Paytm Links</div>
                    <div className={styles.horizontalLine}></div>
                    <div className={styles.form}>
                        <div className={styles.textInput}>
                            <TextField id="outlined-basic" label="Amount" variant="outlined"
                                       value={userData?.amount}
                                       className={styles.input}
                                       onChange={(e) => setUserData((prevState) => ({
                                           ...prevState,
                                           amount: e.target.value
                                       }))}
                            />
                        </div>

                        <div className={styles.textInput}>
                            <TextField id="outlined-basic" label="Description" variant="outlined"
                                       value={userData?.description}
                                       className={styles.input}
                                       onChange={(e) => setUserData((prevState) => ({
                                           ...prevState,
                                           description: e.target.value
                                       }))}/>
                        </div>
                        <div className={styles.buttonStyle}>
                            <button className={styles.enabled} onClick={() => createPaytmLink()}>Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PaymentLink