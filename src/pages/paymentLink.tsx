import styles from "@/styles/Home.module.css";
import {TextField} from "@mui/material";
import React, {useState} from "react";
import {useRouter} from "next/router";

const PaymentLink = () => {
    const [userData, setUserData] = useState({})
    const router = useRouter();

    const createPaytmLink = async () => {
        let res = await (await fetch("/api/createLinkApi", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }))
        const currentResponse = await res.json()
        if (currentResponse) {
            console.log("response ::: ",currentResponse)

            const data = {
                linkId: currentResponse.linkId
            }
            console.log("data is :::::::::::::::::;", data)
            // let response = await fetch("/api/checkPaymentStatus", {
            //     method: "POST", // or 'PUT'
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(data),
            // })
            console.log("response for Payment link is created successfully ::: ", currentResponse, "payment Status ")
            console.log("value of the second response is ::::::::::::::::::")
            // await currentResponse.then((res:any) => {
                console.log("response inside ::: ", currentResponse)
                await router.push({
                    pathname: "/paytmLink",
                    query: currentResponse,
                });

            // })
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