import React, {useState} from "react";
import axios from "axios";
import {IoMdArrowBack} from 'react-icons/io';
import styles from '@/styles/Home.module.css'
import {Button, Container, createTheme, TextField, ThemeProvider} from "@mui/material";
import {useRouter} from "next/router";

const theme = createTheme();

const CreateOrder = () => {
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('');
    const [receipt, setReceipt] = useState('');
    const [razorpayId, setRazorpayId] = useState('');
    const router = useRouter();
    let data;
    const handleCreateOrder = async () => {
        data = { //create data for api calling
            amount: parseInt(amount),
            currency: currency,
            receipt: receipt,
            razorpay_id: razorpayId,
        }
        await axios.post('/api/CreateApi', data).then(async (res: any) => {
            if (res && res.data) {
                res.data.key = razorpayId;
                await router.push({
                    pathname: "/createApiResponse",
                    query: res.data,
                });
            }
        })
    }

    const handleDisabled = () => {
        return !(razorpayId && amount && currency && receipt);
    }

    return (
        <div className={styles.main}>
            <ThemeProvider theme={theme}>
                <Container>
                    <div className={styles.App}>
                        <button className={styles.backButton} onClick={() => router.back()}><IoMdArrowBack size={30}/>
                        </button>
                        <div className={styles.heading}>CREATE ORDER</div>
                        <div className={styles.form}>
                            <div className={styles.textInput}>
                                <TextField id="outlined-basic" label="RazorpayId" variant="outlined" value={razorpayId}
                                           onChange={e => setRazorpayId(e.target.value)}
                                />
                            </div>
                            <div className={styles.textInput}>
                                <TextField id="outlined-basic" label="Amount" variant="outlined" value={amount}
                                           onChange={e => setAmount(e.target.value)}
                                />
                            </div>
                            <div className={styles.textInput}>
                                <TextField id="outlined-basic" label="Currency" variant="outlined" value={currency}
                                           onChange={e => setCurrency(e.target.value)}
                                />
                            </div>
                            <div className={styles.textInput}>
                                <TextField id="outlined-basic" label="Receipt" variant="outlined" value={receipt}
                                           onChange={e => setReceipt(e.target.value)}
                                />
                            </div>
                            <Button disabled={handleDisabled()}
                                    onClick={handleCreateOrder}>Create Order</Button>
                        </div>
                    </div>
                </Container>
            </ThemeProvider>
        </div>
    )
}
export default CreateOrder