import React, {useState, useCallback} from "react";
import axios from "axios";
import styles from '@/styles/Home.module.css'
import {Container, createTheme, TextField, ThemeProvider} from "@mui/material";
import {useRouter} from "next/router";
import {Loading} from "@/Component/Loading";
const theme = createTheme();
import backButton from "../../public/backButton.png"
import Image from "next/image";

/**
 * Render Create Order Screen
 * @constructor
 */
const CreateOrder = () => {
    const [amount, setAmount] = useState('')
    const [isActive, setActive] = useState(false)
    const [currency, setCurrency] = useState('');
    const [receipt, setReceipt] = useState('');
    const [razorpayId, setRazorpayId] = useState('');
    const router = useRouter();
    let data: any;
    //handle onclick event on create Order
    const handleCreateOrder = async () => {
        setActive(true)
        data = { //create data for api calling
            amount: parseInt(amount),
            currency: currency,
            receipt: receipt,
        }
        await axios.post('/api/createOrder', data).then(async (res: any) => {
            if (res && res.data) {
                res.data.razorpay_id = razorpayId;
                if (res.data.error) {
                    await router.push({
                        pathname: "/OrderResponseFailed",
                        query: res.data.error,
                    });
                } else {
                    await router.push({
                        pathname: "/createOrderResponse",
                        query: res.data,
                    });
                }
            }
        })
    }
    //handle onClick Disabled
    const handleDisabled = () => {
        return !(razorpayId && amount && currency && receipt);
    }
    return (
        <div>
            {!isActive && <div className={styles.backBtnStyle}>
               <Image src={backButton} alt={""}
                      width={40}
                      height={40}
                      onClick={() => router.back()}
               />
            </div>
            }
            <div className={styles.main}>
                <ThemeProvider theme={theme}>
                    <Container>
                        {
                            isActive ?
                                <Loading/>
                                :
                                <div className={styles.App}>
                                    <div className={styles.tab}>
                                        <div className={styles.heading}>Create Order</div>
                                        <div className={styles.horizontalLine}></div>
                                        <div className={styles.form}>
                                            <div className={styles.textInput}>
                                                <TextField id="outlined-basic"
                                                           label="RazorpayId"
                                                           variant="outlined"
                                                           value={razorpayId}
                                                           className={styles.input}
                                                           onChange={e => setRazorpayId(e.target.value)}
                                                />
                                            </div>
                                            <div className={styles.textInput}>
                                                <TextField id="outlined-basic"
                                                           label="Amount"
                                                           variant="outlined"
                                                           value={amount}
                                                           className={styles.input}
                                                           onChange={(e: any) =>
                                                               setAmount(e.target.value)}
                                                />
                                            </div>
                                            <div className={styles.textInput}>
                                                <TextField id="outlined-basic"
                                                           label="Currency"
                                                           variant="outlined"
                                                           value={currency}
                                                           className={styles.input}
                                                           onChange={(e: any) => setCurrency(e.target.value)}
                                                />
                                            </div>
                                            <div className={styles.textInput}>
                                                <TextField id="outlined-basic"
                                                           label="Receipt"
                                                           variant="outlined"
                                                           value={receipt}
                                                           className={styles.input}
                                                           onChange={(e: any) => setReceipt(e.target.value)}
                                                />
                                            </div>
                                            <div className={styles.buttonStyle}>
                                                <button disabled={handleDisabled()}
                                                        className={`${handleDisabled() ? styles.btn : styles.enabled}`}
                                                        onClick={handleCreateOrder}>Create Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </Container>
                </ThemeProvider>
            </div>
        </div>
    )
}
export default CreateOrder