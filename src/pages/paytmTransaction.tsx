import React from "react"
import axios from "axios/index";

const PaytmTransactionSuccess=async ()=>{
    await axios.post('/api/postTransaction', data).then(async (res: any) => {
        if (res && res.data) {
            console.log("console .log::::::::::::::::::::::::::",res)
        }
    })
    return(
        <>

        </>
    )

}
export default PaytmTransactionSuccess