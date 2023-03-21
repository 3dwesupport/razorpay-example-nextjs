import React, {useState} from "react";
import axios from "axios";
import styles from '@/styles/Home.module.css'
import {Button, Container, createTheme, TextField, ThemeProvider} from "@mui/material";
import {useRouter} from "next/router";
const theme = createTheme();

const CreateOrder = () => {
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('');
    const [receipt, setReceipt] = useState('');
    const router = useRouter();

    const handleCreateOrder = async () => {
        const data = { //create data for api calling
            amount: amount,
            currency: currency,
            receipt: receipt,
        }
        await axios.post('/api/CreateApi', data).then(async (res: any) => {
            if (res && res.data) {
                console.log("response::::::::::::::::::", res.data)
                await router.push({
                    pathname: "/createApiResponse",
                    query: res.data,
                });
            }
        })

    }

    return (
        <div className={styles.main}>
            <ThemeProvider theme={theme}>
                <Container>
                    <div className={styles.App}>
                        <div className={styles.heading}>CREATE ORDER</div>
                        <div className={styles.form}>
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
                            <Button onClick={handleCreateOrder}>Create Order</Button>
                        </div>
                    </div>
                </Container>
            </ThemeProvider>
        </div>
    )
}
export default CreateOrder