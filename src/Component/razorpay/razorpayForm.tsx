import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import logo_full from "../../../public/Razorpay.png";
import {Amount, Currency, RazorpayId, RazorpayKey, Receipt} from "@/Component/razorpay/formComponent";
import React from "react";


/**
 * render the form component of create order
 * @param params
 * @constructor
 */
export const CreateOrderForm = (params: any) => {
    const {
        razorpayId,
        setRazorpayId,
        error,
        amount,
        handleAmount,
        currency,
        handleCurrency,
        receipt,
        setReceipt,
        handleDisabled,
        handleCreateOrder,
        razorpayKey,
        setRazorpayKey
    } = params

    return (
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
                            <RazorpayKey razorpayKey={razorpayKey}
                                         setRazorpayKey={setRazorpayKey}
                                         error={error}/>

                            <Amount amount={amount}
                                    handleAmount={handleAmount}/>
                            <Currency currency={currency}
                                      handleCurrency={handleCurrency}/>
                            <Receipt reciept={receipt}
                                     setReceipt={setReceipt}
                                     error={error}/>
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
        </div>
    )
}

/**
 * Render the razorpay logo on screen
 * @constructor
 */
export const RazorpayLogo = () => {
    return (
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