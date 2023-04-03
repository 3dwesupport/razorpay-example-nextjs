import React from "react"
import axios from "axios";

const PaytmTransactionSuccess=()=>{
     axios.post('/api/postTransaction').then( (res: any) => {

    })
    return(
        <>
           <div>value is :::::::</div>

        </>
    )

}
export default PaytmTransactionSuccess