import React, {useState} from "react";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import {TextField} from "@mui/material";
import {useRouter} from "next/router";
import {ensureLeadingSlash} from "next/dist/shared/lib/page-path/ensure-leading-slash";
import {number, string} from "prop-types";


const RazorpayPaymentLink = () => {
    const [amount, setAmount] = useState<any>("")
    const [currency, setCurrency] = useState<any>("")
    const [description, setDescription] = useState<any>("")
    const [mobileNo, setMobileNo] = useState<any>("")
    const [email, setEmail] = useState<any>("")
    const [userName, setUserName ] = useState<any>("")
    const router = useRouter();
    const showPaytm = async () => {
        const data: any = {
            amount: parseInt(amount),
            currency: currency,
            description: description,
        }

        if (!isNaN(amount) && currency === "INR") {
            await axios.post('/api/razorpayLinkApi', data).then(async (res: any) => {
                if (res && res.data) {
                    if (res.data.error) {
                        await router.push({
                            pathname: "/OrderResponseFailed",
                            query: res.data.error,
                        });
                    } else {
                        await router.push({
                            pathname: "/razorpayResponseLink",
                            query: res.data,
                        });
                    }
                }
            })
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.App}>
                <div className={styles.tab}>
                    <div className={styles.heading}>Create Link</div>
                    <div className={styles.horizontalLine}></div>
                    <div className={styles.form}>
                        <div className={styles.textInput}>
                            <TextField id="outlined-basic" label="Amount" variant="outlined"
                                       value={amount}
                                       className={styles.input}
                                       onChange={e => setAmount(e.target.value)}/>

                        </div>
                        <div className={styles.textInput}>
                            <TextField id="outlined-basic" label="Currency" variant="outlined"
                                       value={currency}
                                       className={styles.input}
                                       onChange={e => setCurrency(e.target.value)}/>
                        </div>
                        <div className={styles.textInput}>
                            <TextField id="outlined-basic" label="Description" variant="outlined"
                                       value={description}
                                       className={styles.input}
                                       onChange={e => setDescription(e.target.value)}/>
                        </div>
                        <div className={styles.textInput}>
                            <TextField id="outlined-basic" label="Customer Name" variant="outlined"
                                       value={userName}
                                       className={styles.input}
                                       onChange={e => setUserName(e.target.value)}/>
                        </div>
                        <div className={styles.textInput}>
                            <TextField id="outlined-basic" label="contact No" variant="outlined"
                                       value={mobileNo}
                                       className={styles.input}
                                       onChange={e => setMobileNo(e.target.value)}/>
                        </div>
                        <div className={styles.textInput}>
                            <TextField id="outlined-basic" label="Email" variant="outlined"
                                       value={email}
                                       className={styles.input}
                                       onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className={styles.buttonStyle}>
                            <button className={styles.enabled} onClick={() => showPaytm()}>Submit
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default RazorpayPaymentLink