import React, {useState} from "react";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import {TextField} from "@mui/material";
import {useRouter} from "next/router";
import {SelectInputBox} from "@/Component/selectInputBox";
import {currencyOptions} from "@/constants";
import {Loading} from "@/Component/Loading";
import {RazorpayId, RazorpayLogo} from "@/Component/razorpay/razorpayForm";


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
    const [isActive, setActive] = useState(false)
    const showRazorpay = async () => {
        setActive(true)
        setError(false)
        const data: any = {
            amount: parseInt(amount)*100,
            currency: currency,
            description: description,
            mobileNo: mobileNo,
            email: email,
            userName: userName,
            gatewayId: razorpayId
        }

        if (!isNaN(amount) && currency === "INR") {
            await axios.post('/api/razorpayLinkApi', data).then(async (res: any) => {
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

    const handleCurrency = (e: any) => {
        let selectedItem: any = currencyOptions.find((item: any) => item.currency === e.target.value);//find the object having gateway value of customers selected gateway
        setCurrency(selectedItem.currency);//assign value to the variable for the selected metal
    }
    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError(!emailRegex.test(e.target.value));
    };

    const handleNumericValueChange = (e) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length <= 10) {
            setMobileNo(onlyNums);
        }
    };
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
                                                onClick={() => showRazorpay()}>Create Link
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

export const Amount = (params: any) => {
    const {amount, handleAmount} = params
    return (
        <TextField id="outlined-basic" label="Amount" variant="outlined"
                   value={amount}
                   className={styles.input}
                   onChange={handleAmount}/>
    )
}

export const Currency = (params: any) => {
    const {currency, handleCurrency} = params
    return (
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

    )
}
export const Description = (params: any) => {
    const {description, setDescription, error} = params
    return (
        <>
            <TextField id="outlined-basic" label="Description" variant="outlined"
                       value={description}
                       className={styles.input}
                       onChange={e => setDescription(e.target.value)}/>
            {!error && (description.length <= 3 && description.length != 0) ?
                <label className={styles.error}>Enter a Description
                </label> : ""
            }
        </>
    )
}

export const UserName = (params: any) => {
    const {userName, setUserName, error} = params
    return (
        <>
            <TextField id="outlined-basic" label="Customer Name" variant="outlined"
                       value={userName}
                       className={styles.input}
                       onChange={e => setUserName(e.target.value)}/>

            {!error && (userName.length < 3 && userName.length != 0) ?
                <label className={styles.error}>Minimum 3 character allowed
                </label> : ""
            }

        </>
    )
}

const ContactNo = (params: any) => {
    const {mobileNo, handleNumericValueChange, error} = params
    return (
        <>
            <TextField id="outlined-basic" label="contact No"
                       variant="outlined"
                       inputMode={"numeric"}
                       value={mobileNo}
                       className={styles.input}
                       onChange={handleNumericValueChange}
            />

            {!error && (mobileNo.length !== 10 && mobileNo.length != 0) ?
                <label className={styles.error}>Enter 10 digit mobile number
                </label> : ""
            }
        </>
    )
}
export const Email = (params: any) => {
    const {email, handleEmailChange, error} = params
    return (
        <>
            <div className={styles.textInput}>
                <TextField id="outlined-basic" label="Email" variant="outlined"
                           value={email}
                           className={styles.input}
                           onChange={handleEmailChange}/>
            </div>
            {error && email.length != 0 ?
                <label className={styles.error}>Please enter a valid email address
                </label> : ""
            }
        </>
    )
}
