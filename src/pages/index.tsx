import {useRouter} from "next/router";
import styles from "@/styles/Home.module.css";
import React, {useState} from "react";
import {SelectInputBox} from "@/Component/selectInputBox";
import {availableGateway, availableOptions, paytmOption} from "@/constants";
import {GateWayIcon} from "@/Component/gateWayIcon";

/***
 * Render DropDown menu for gateways
 * @constructor
 */
// @ts-ignore
export default function Home() {
    const [selectedGateway, setSelectedGateway] = useState<any>(undefined);
    const [selectedOptions, setSelectedOptions] = useState<any>([]);
    const [selectedItem, setSelectedItem] = useState("");
    const router = useRouter();

    // handle gateway dropdown
    const handleGateway = (e: any) => {
        let selectedItem: any = availableGateway.find((item: any) => item.gateway === e.target.value);//find the object having gateway value of customers selected gateway
        setSelectedGateway(selectedItem.gateway);//assign value to the variable for the selected gateway
        setSelectedOptions(selectedItem.gateway === availableGateway[0].gateway ? availableOptions : paytmOption);//assign value to the variable for the selected options
    }
    //handle options dropdown
    const handleOptions = (e: any) => {
        let selectedItem: any = selectedOptions.find((item: any) => item.options === e.target.value);//find the object having gateway value of customers selected gateway
        console.log("selected", selectedItem.options)
        setSelectedItem(selectedItem.options);//assign value to the variable for the selected options
    }
    //handle Disabled submit button
    const handleDisabled = () => {
        return !(selectedGateway && selectedOptions);
    }
    //handle submit button
    const handleSubmit = async () => {
        let pathname;
        if (selectedGateway == availableGateway[0].gateway) {
            switch (selectedItem) {
                case availableOptions[0].options:
                    pathname = '/razorpay/razorpayPayment/createOrder';
                    break;
                case  availableOptions[1].options:
                    pathname = 'razorpay/razorpayPayment/payment';
                    break;
                case availableOptions[2].options:
                    pathname = 'razorpay/razorpayLink/createLink';
                    break;
                default:
                    pathname = '/';

            }
        } else {
            switch (selectedItem) {
                case paytmOption[0].options:
                    pathname = '/paytm/paytmPayment/paytmCreateOrder';
                    break;
                case  paytmOption[1].options:
                    pathname = '/paytm/PaytmLink/createPaytmLink';
                    break;
                default:
                    pathname = '/';
            }

        }
        await router.push({
            pathname: pathname,
        });

    }
    return (
        <>

            <div className={styles.main}>
                <div className={styles.mainContainer}>
                    <GateWayIcon/>
                    {/*<GatewayForm selectedGateway={selectedGateway}*/}
                    {/*             selectedItem={selectedItem} */}
                    {/*             handleGateway={handleGateway}*/}
                    {/*             handleOptions={handleOptions}*/}
                    {/*             */}
                    {/*/>*/}
                    <div className={styles.App}>
                        <div className={styles.tab}>
                            <div className={styles.heading}>Payment Gateway</div>
                            <div className={styles.horizontalLine}></div>
                            <div className={styles.selectInput}>
                                <SelectInputBox
                                    styles={{width: "100%"}}
                                    label='CHOOSE PAYMENT GATEWAY'
                                    selectInputStyle={styles.textFieldStyle}
                                    defaultValue={selectedGateway}
                                    selectField={selectedGateway}
                                    items={availableGateway.map((type: any) => type.gateway)}
                                    onFieldChange={(e: any) => handleGateway(e)}
                                />
                            </div>
                            <div className={styles.selectInput}>
                                <SelectInputBox
                                    styles={{width: "100%", marginLeft: "0%", marginBottom: "3%"}}
                                    label='CHOOSE OPTIONS'
                                    selectInputStyle={styles.textFieldStyle}
                                    defaultValue={selectedItem}
                                    selectField={selectedItem}
                                    items={selectedOptions?.map((type: any) => type.options)}
                                    onFieldChange={(e: any) => handleOptions(e)}
                                />
                                <div className={styles.btnStyle}>
                                    <button disabled={handleDisabled()}
                                            className={`${handleDisabled() ? styles.btn : styles.enabled}`}
                                            onClick={handleSubmit}>Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export const GatewayForm=(params:any)=>{
    const[selectedGateway,selectedItem,handleGateway,handleOptions]=params
    return(
        <>
        </>

    )
}







