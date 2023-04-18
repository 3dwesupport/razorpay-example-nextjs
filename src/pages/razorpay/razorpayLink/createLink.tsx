import React, {useState} from "react";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import {useRouter} from "next/router";
import {currencyOptions} from "@/constants";
import {Loading} from "@/Component/loading";

import {RazorpayLogo} from "@/Component/razorpay/razorpayForm";

import {
    Amount,
    ContactNo,
    Currency,
    Description,
    Email,
    RazorpayKey,
    RazorpayId,
    UserName
} from "@/Component/razorpay/formComponent";


/**
 * Render the Payment
 * Link Form
 * @constructor
 */
const CreateLink = () => {
    const [amount, setAmount] = useState<any>("")
    const [currency, setCurrency] = useState<any>("")
    const [description, setDescription] = useState<any>("")
    const [mobileNo, setMobileNo] = useState<any>("")
    const [email, setEmail] = useState<any>("")
    const [userName, setUserName] = useState<any>("")
    const router = useRouter();
    const [error, setError] = useState(false)
    const [razorpayId, setRazorpayId] = useState("")
    const [razorpayKey, setRazorpayKey] = useState("")
    const [isActive, setActive] = useState(false)

    //handle the  create Link functionality
    const createLink = async () => {
        setActive(true)
        setError(false)
        const data: any = {
            amount: parseInt(amount) * 100,
            currency: currency,
            description: description,
            mobileNo: mobileNo,
            email: email,
            userName: userName,
            gatewayId: razorpayId,
            razorpayKey:razorpayKey
        }

        if (!isNaN(amount) && currency === "INR") {
            await axios.post('/api/razorpay/razorpayLinkApi', data).then(async (res: any) => {
                if (res && res.data) {
                    res.data.razorpay_id = razorpayId;
                    await router.push({
                        pathname: "/razorpay/razorpayLink/responseRazorpayLink",
                        query: res.data,
                    });
                }

            })
        }
    }
    //handle the submit button Disable
    const handleDisabled = () => {
        return !(amount && description && currency && userName && email && mobileNo && !error);
    }

    // handle currency
    const handleCurrency = (e: any) => {
        let selectedItem: any = currencyOptions.find((item: any) => item.currency === e.target.value);//find the object having gateway value of customers selected gateway
        setCurrency(selectedItem.currency);//assign value to the variable for the selected metal
    }

    //handle email validation
    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError(!emailRegex.test(e.target.value));
    };

    //handle Contact no validation
    const handleNumericValueChange = (e: any) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length <= 10) {
            setMobileNo(onlyNums);
        }
    };
    //handle amount Validation
    const handleAmount = (e: any) => {
        const input = e.target.value;
        const regex = /^\d+(\.\d{0,9})?$/; // pattern for numeric and decimal values
        if (regex.test(input) || input === '') {
            setAmount(input);
        }
    };
    return (
        <div className={styles.main}>
            {
                isActive ?
                    <Loading/>
                    :
                    <div className={styles.mainContainer}>
                        <RazorpayLogo/>
                        <div className={styles.App}>
                            <div className={styles.tab}>
                                <div className={styles.heading}>Create Link</div>
                                <div className={styles.horizontalLine}></div>
                                <div className={styles.form}>
                                    <div className={styles.textInput}>
                                        <RazorpayId razorpayId={razorpayId}
                                                    setRazorpayId={setRazorpayId}
                                                    error={error}/>
                                        <RazorpayKey razorpayKey={razorpayKey}
                                                    setRazorpayKey={setRazorpayKey}
                                                    error={error}/>
                                        <Amount amount={amount}
                                                handleAmount={handleAmount}/>
                                        <Currency currency={currency}
                                                  handleCurrency={handleCurrency}/>
                                        <Description description={description}
                                                     setDescription={setDescription}
                                                     error={error}
                                        />
                                        <UserName userName={userName}
                                                  setUserName={setUserName}
                                                  error={error}/>
                                        <ContactNo
                                            mobileNo={mobileNo}
                                            handleNumericValueChange={handleNumericValueChange}
                                            error={error}/>
                                        <Email email={email}
                                               handleEmailChange={handleEmailChange}
                                               error={error}/>
                                    </div>
                                    <div className={styles.buttonStyle}>
                                        <button disabled={handleDisabled()}
                                                className={`${handleDisabled() ? styles.btn : styles.enabled}`}
                                                onClick={() => createLink()}>Create Link
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
export default CreateLink
