import styles from '../../styles/Home.module.css'
import {TextField} from "@mui/material";
import {SelectInputBox} from "@/Component/selectInputBox";
import {currencyOptions} from "@/constants";
import React from "react";


/**
 * render the text field razorpay id
 * @param params
 * @constructor
 */
export const RazorpayId = (params: any) => {
    const {razorpayId, setRazorpayId, error} = params
    return (
        <div>
            <TextField id="outlined-basic"
                       label="RazorpayId"
                       variant="outlined"
                       value={razorpayId}
                       className={styles.input}
                       onChange={e => setRazorpayId(e.target.value)}
            />

            {!error && (razorpayId?.length <= 18 && razorpayId?.length != 0) ?
                <label className={styles.error}>Enter a valid RazorpayId
                </label> : ""
            }
        </div>
    )
}
/**
 * Render the amount components
 * @param params
 * @constructor
 */
export const Amount = (params: any) => {
    const {amount, handleAmount} = params
    return (
        <TextField id="outlined-basic" label="Amount" variant="outlined"
                   value={amount}
                   className={styles.input}
                   onChange={handleAmount}/>
    )
}

/**
 * render the currency component
 * @param params
 * @constructor
 */
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

/**
 * Render the Description Component
 * @param params
 * @constructor
 */
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

/**
 * render the UserName Component
 * @param params
 * @constructor
 */
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

/**
 * Render the contactNo component
 * @param params
 * @constructor
 */
export const ContactNo = (params: any) => {
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

/**
 * Render the email Component
 * @param params
 * @constructor
 */
export const Email = (params: any) => {
    const {email, handleEmailChange, error} = params
    return (
        <>
            <TextField id="outlined-basic" label="Email" variant="outlined"
                       value={email}
                       className={styles.input}
                       onChange={handleEmailChange}/>
            {error && email.length != 0 ?
                <label className={styles.error}>Please enter a valid email address
                </label> : ""
            }
        </>
    )
}
/**
 * Render the Receipt component
 * @param params
 * @constructor
 */
export const Receipt = (params: any) => {
    const {receipt, setReceipt, error} = params
    return (
        <>
            <TextField id="outlined-basic"
                       label="Receipt"
                       variant="outlined"
                       value={receipt}
                       className={styles.input}
                       onChange={(e: any) => setReceipt(e.target.value)}
            />

            {!error && (receipt?.length < 5 && receipt?.length != 0) ?
                <label className={styles.error}>Enter a receipt id
                </label> : ""
            }
        </>
    )
}
/**
 * Render the MKey component
 * @param params
 * @constructor
 */
export const Mid=(params:any)=>{
    const{mid,setMid,error}=params
    return(
        <>
            <TextField id="outlined-basic" label="Merchant ID" variant="outlined"
                       value={mid}
                       className={styles.input}
                       onChange={e => setMid(e.target.value)}/>
            {!error && (mid.length < 20 && mid.length != 0) ?
                <label className={styles.error}>Enter a valid MID
                </label> : ""
            }
        </>
    )
}
export const MKey=(params:any)=>{
    const{mKey,setMKey,error}=params
    return(
        <>
            <TextField id="outlined-basic" label="Merchant Key" variant="outlined"
                       value={mKey}
                       className={styles.input}
                       onChange={e => setMKey(e.target.value)}/>
            {!error && (mKey?.length < 20 && mKey?.length != 0) ?
                <label className={styles.error}>Enter a valid MID
                </label> : ""
            }
        </>
    )
}