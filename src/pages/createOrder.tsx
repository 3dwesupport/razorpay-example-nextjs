import React, {useState, useCallback} from "react";
import axios from "axios";
import styles from '@/styles/Home.module.css'
import {Container, createTheme, TextField, ThemeProvider} from "@mui/material";
import {useRouter} from "next/router";
import {Loading} from "@/Component/Loading";
import {SelectInputBox} from "@/Component/selectInputBox";
import {availableGateway, currencyOptions} from "@/constants";

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
    const [error, setError] = useState('');
    const [value, setValue] = useState('');
    // const [value, setError] = useState('');
    const router = useRouter();
    let data: any;
    //handle onclick event on create Order
    const handleCreateOrder = async (e: any) => {
        setActive(true)
        e.preventDefault();
        if (razorpayId.length == 0) {
            setError(true)
        }
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

    const handleRazorpayId = (value) => {
        setRazorpayId(value)
        if (value.length <= 18) setError("please enter a valid razorpay id")
        else setError("")
    }
    const handleReceipt=(value)=>{
        setReceipt(value)
        if(value.length<=5)
            setValue("please enter a valid receipt number")
        else setValue("")
    }

    const handleCurrency=(e:any)=>{
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
                                                           onChange={e => handleRazorpayId(e.target.value)}
                                                />
                                            </div>
                                            <label>{error}</label>

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
                                                           onChange={(e: any) => handleReceipt(e.target.value)}
                                                />
                                            </div>
                                            <label>{value}</label>
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