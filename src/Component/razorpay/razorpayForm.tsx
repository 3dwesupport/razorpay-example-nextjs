import styles from '../../styles/Home.module.css'
import {TextField} from "@mui/material";
import {SelectInputBox} from "@/Component/selectInputBox";
import Image from 'next/image'
import logo_full from "../../../public/Razorpay.png";
import {currencyOptions} from "@/constants";


/**
 * render the form component of create order
 * @param params
 * @constructor
 */
export const CreateOrderForm=(params:any)=>{
    const{razorpayId
        ,setRazorpayId,
        error,
        amount,
        handleAmount,
        currency,
        handleCurrency,
        receipt,
        setReceipt,
        handleDisabled,
        handleCreateOrder,
    }=params

    return(
        <div className={styles.mainContainer}>
            <RazorpayLogo/>
            <div className={styles.App}>
                <div className={styles.tab}>
                    <div className={styles.heading}>Create Order</div>
                    <div className={styles.horizontalLine}></div>
                    <div className={styles.form}>
                        <div className={styles.textInput}>
                       <RazorpayId razorpayId={razorpayId}
                                   setRazorpayId={setRazorpayId}
                                   error={error}/>
                        </div>
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
        </div>
    )
}
/**
 * render the text field razorpay id
 * @param params
 * @constructor
 */
export const RazorpayId = (params:any) => {
    const{razorpayId,setRazorpayId,error}=params
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
 * Render the razorpay logo on screen
 * @constructor
 */
export const RazorpayLogo=()=>{
    return(
        <div className={styles.LeftDiv}>
            <div className={styles.image}>
                <Image
                    src={logo_full}
                    alt="Picture of the Logo"
                    className={styles.razorpayImage}
                />
            </div>
            <div className={styles.text}>
                Test Razorpay Gateway
            </div>
        </div>
    )
}