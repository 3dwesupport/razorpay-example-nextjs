import {useRouter} from "next/router";
import styles from "@/styles/Home.module.css";
import React, {useState} from "react";
import {SelectInputBox} from "@/Component/selectInputBox";
import {availableGateway, availableOptions, paytmOption} from "@/constants";


// @ts-ignore
export default function Home() {
    const [selectedGateway, setSelectedGateway] = useState<any>(undefined);
    const [selectedOptions, setSelectedOptions] = useState<any>([]);
    const [selectedItem, setSelectedItem] = useState("");
    const router = useRouter();

    // handle gateway dropdown
    const handleGateway = (e: any) => {
        let selectedItem: any = availableGateway.find((item: any) => item.gateway === e.target.value);//find the object having gateway value of customers selected gateway
        setSelectedGateway(selectedItem.gateway);//assign value to the variable for the selected metal
        setSelectedOptions(selectedItem.gateway === availableGateway[0].gateway ? availableOptions : paytmOption);//assign value to the variable for the selected metal
    }
    //handle gateway dropdown
    const handleOptions = (e: any) => {
        let selectedItem: any = selectedOptions.find((item: any) => item.options === e.target.value);//find the object having gateway value of customers selected gateway
        console.log("selected", selectedItem.options)
        setSelectedItem(selectedItem.options);//assign value to the variable for the selected metal
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
                    pathname = '/createOrder';
                    break;
                case  availableOptions[1].options:
                    pathname = '/paymentGateWay';
                    break;
                case availableOptions[2].options:
                    pathname = '/razorpayPaymentLink';
                    break;
                default:
                    pathname = '/';
            }
        } else {
            switch (selectedItem) {
                case paytmOption[0].options:
                    pathname = '/paytmOrder';
                    break;
                case  paytmOption[1].options:
                    pathname = '/paymentLink';
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
            <div className={styles.home}>
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
        </>
    )
    // return (
    //     // <PaymentForm/>
    //
    //
    //     // eslint-disable-next-line react/jsx-no-undef
    //     <PaytmOrder/>
    //     //   <RazorpayPaymentLink/>
    //     // <PaymentLink/>
    //     // x<Document/>
    // )

}



