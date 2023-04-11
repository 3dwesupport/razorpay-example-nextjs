import React, {useState} from "react";
import axios from "axios";
import styles from '@/styles/Home.module.css'
import {Container, createTheme, TextField, ThemeProvider} from "@mui/material";
import {useRouter} from "next/router";
import {Loading} from "@/Component/Loading";
import {SelectInputBox} from "@/Component/selectInputBox";
import {currencyOptions} from "@/constants";
const theme = createTheme();

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
    const [error, setError] = useState(false);
    const router = useRouter();
    let data: any;
    //handle onclick event on create Order
    const handleCreateOrder = async (e: any) => {
        setActive(true)
        e.preventDefault();
        if (razorpayId.length <= 18 || receipt.length <= 5) {
            setError(true)
        }
        data = { //create data for api calling
            amount: parseInt(amount*100),
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

    const handleAmount = (e) => {
        const input = e.target.value;
        const regex =  /^\d+(\.\d{0,9})?$/; // pattern for numeric and decimal values
        if (regex.test(input) || input === '') {
            setAmount(input);
        }
    }
    //handle onClick Disabled
    const handleDisabled = () => {
        return !(razorpayId.length >= 18 && amount && currency && receipt.length >= 5);
    }
    const handleCurrency = (e: any) => {
        let selectedItem: any = currencyOptions.find((item: any) => item.currency === e.target.value);//find the object having gateway value of customers selected gateway
        setCurrency(selectedItem.currency);//assign value to the variable for the selected metal
    }
    return (
        <div>
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
                                            {!error && (razorpayId.length <= 18 && razorpayId.length != 0) ?
                                                <label className={styles.error}>Enter a valid RazorpayId
                                                </label> : ""
                                            }
                                            <div className={styles.textInput}>
                                                <TextField id="outlined-basic"
                                                           label="Amount"
                                                           variant="outlined"
                                                           value={amount}
                                                           className={styles.input}
                                                           onChange={handleAmount}
                                                />
                                            </div>
                                            <div className={styles.textInputValue}>
                                                <SelectInputBox
                                                    styles={{width: "100%"}}
                                                    label='Currency'
                                                    selectInputStyle={styles.textFieldValue}
                                                    defaultValue={currency}
                                                    selectField={currency}
                                                    items={currencyOptions.map((type: any) => type.currency)}
                                                    onFieldChange={(e: any) => handleCurrency(e)}
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
                                            {!error && (receipt.length < 5 && receipt.length != 0) ?
                                                <label className={styles.error}>Enter a receipt id
                                                </label> : ""
                                            }

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