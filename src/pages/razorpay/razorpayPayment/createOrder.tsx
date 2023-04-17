import React, {useState} from "react";
import axios from "axios";
import styles from '@/styles/Home.module.css'
import {Container, createTheme,ThemeProvider} from "@mui/material";
import {useRouter} from "next/router";
import {Loading} from "@/Component/loading";
import {currencyOptions} from "@/constants";
import {CreateOrderForm} from "@/Component/razorpay/razorpayForm";
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
            amount: parseInt(amount)*100,
            currency: currency,
            receipt: receipt,
        }
        await axios.post('/api/razorpay/createOrderApi', data).then(async (res: any) => {
            if (res && res.data) {
                res.data.razorpay_id = razorpayId;
                if (res.data.error) {
                    await router.push({
                        pathname: "/razorpay/razorpayPayment/OrderResponseFailed",
                        query: res.data.error,
                    });
                } else {
                    await router.push({
                        pathname: "/razorpay/razorpayPayment/orderSuccessResponse",
                        query: res.data,
                    });
                }
            }
        })
    }
    //handle amount Validation
    const handleAmount = (e:any) => {
        const input = e.target.value;
        const regex = /^\d+(\.\d{0,9})?$/; // pattern for numeric and decimal values
        if (regex.test(input) || input === '') {
            setAmount(input);
        }
    }
    //handle onClick Disabled
    const handleDisabled = () => {
        return !(razorpayId.length >= 18 && amount && currency && receipt.length >= 5);
    }
    //handle the currency type
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
                                <CreateOrderForm razorpayId={razorpayId}
                                                 setRazorpayId={setRazorpayId}
                                                 error={error}
                                                 amount={amount}
                                                 handleAmount={handleAmount}
                                                 currency={currency}
                                                 handleCurrency={handleCurrency}
                                                 receipt={receipt}
                                                 setReceipt={setReceipt}
                                                 handleDisabled={handleDisabled}
                                                 handleCreateOrder={handleCreateOrder}/>
                        }
                    </Container>
                </ThemeProvider>
            </div>
        </div>
    )
}
export default CreateOrder

