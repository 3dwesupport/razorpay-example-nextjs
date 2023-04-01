import {useRouter} from "next/router";
import styles from "@/styles/Home.module.css";
import React, {useState} from "react";
import {SelectInputBox} from "@/Component/selectInputBox";
import {availableGateway, availableOptions} from "@/constants";
import Document from "./_document";
import PaytmPayment from "@/pages/paytmPayment ";


export default function Home() {
    // const [selectedGateway, setSelectedGateway] = useState<any>(undefined);
    // const [selectedOptions, setSelectedOptions] = useState<any>(undefined);
    // const router = useRouter();

    //handle gateway dropdown
    // const handleGateway = (e: any) => {
    //     let selectedItem: any = availableGateway.find((item: any) => item.gateway === e.target.value);//find the object having gateway value of customers selected gateway
    //     setSelectedGateway(selectedItem.gateway);//assign value to the variable for the selected metal
    // }
    // //handle gateway dropdown
    // const handleOptions = (e: any) => {
    //     let selectedItem: any = availableOptions.find((item: any) => item.options === e.target.value);//find the object having gateway value of customers selected gateway
    //     setSelectedOptions(selectedItem.options);//assign value to the variable for the selected metal
    // }
    // //handle Disabled submit button
    // const handleDisabled = () => {
    //     return !(selectedGateway && selectedOptions);
    // }
    // //handle submit button
    // const handleSubmit = async () => {
    //     await router.push({
    //         pathname: selectedOptions == availableOptions[0].options ? "/createOrder" : "/paymentGateWay",
    //     });
    //
    // }
    // return (
    //     <>
    //         <div className={styles.home}>
    //             <div className={styles.tab}>
    //                 <div className={styles.heading}>Payment Gateway</div>
    //                 <div className={styles.horizontalLine}></div>
    //                 <div className={styles.selectInput}>
    //                     <SelectInputBox
    //                         styles={{width: "100%"}}
    //                         label='CHOOSE PAYMENT GATEWAY'
    //                         selectInputStyle={styles.textFieldStyle}
    //                         defaultValue={availableGateway}
    //                         selectField={selectedGateway}
    //                         items={availableGateway.map((type: any) => type.gateway)}
    //                         onFieldChange={(e: any) => handleGateway(e)}
    //                     />
    //                 </div>
    //                 <div className={styles.selectInput}>
    //                     <SelectInputBox
    //                         styles={{width: "100%", marginLeft: "0%", marginBottom: "3%"}}
    //                         label='CHOOSE OPTIONS'
    //                         selectInputStyle={styles.textFieldStyle}
    //                         defaultValue={availableOptions}
    //                         selectField={selectedOptions}
    //                         items={availableOptions.map((type: any) => type.options)}
    //                         onFieldChange={(e: any) => handleOptions(e)}
    //                     />
    //                     <div className={styles.btnStyle}>
    //                         <button disabled={handleDisabled()}
    //                                 className={`${handleDisabled() ? styles.btn : styles.enabled}`}
    //                                 onClick={handleSubmit}>Submit
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // )
    return(
        // <PaymentForm/>
   <PaytmPayment/>
        // <Document/>
        )

}



