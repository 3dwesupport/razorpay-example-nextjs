import styles from "@/styles/Home.module.css";
import {TextField} from "@mui/material";
import React, {useState} from "react";
import {useRouter} from "next/router";
import {Loading} from "@/Component/Loading";
import Image from "next/image";
import paytmLogo from "../../../../public/paytm.png";

const CreatePaytmLink = () => {
    const [userData, setUserData] = useState({})
    const [error, setError] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const router = useRouter();

    const createPaytmLink = async () => {
        setIsActive(true)
        setError(true)
        let res = await (await fetch("/api/createLinkApi", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }))
        const currentResponse = await res.json()
        if (currentResponse) {
            await router.push({
                pathname: "/paytm/PaytmLink/paytmLinkResponse",
                query: currentResponse,
            });

        }
    }
    const handleDisabled = () => {
        return !(userData?.amount && userData?.description?.length >= 3);
    }
    return (
        <div className={styles.main}>
            {
                isActive ?
                    <Loading/>
                    :
                    <div className={styles.mainContainer}>
                        <div className={styles.LeftDiv}>
                            <div className={styles.image}>
                                <Image
                                    src={paytmLogo}
                                    alt="Picture of the author"
                                    className={styles.razorpayImage}
                                    width="39%"
                                    height="200%"
                                />
                            </div>
                            <div className={styles.text}>
                                Test Paytm Gateway
                            </div>
                        </div>
                        <div className={styles.App}>
                            <div className={styles.tab}>
                                <div className={styles.heading}>Create Paytm Links</div>
                                <div className={styles.horizontalLine}></div>
                                <div className={styles.form}>
                                    <div className={styles.textInput}>
                                        <TextField id="outlined-basic" label="Merchant ID" variant="outlined"
                                                   value={userData?.mid}
                                                   className={styles.input}
                                                   onChange={(e) => setUserData((prevState) => ({
                                                       ...prevState,
                                                       mid: e.target.value
                                                   }))}/>
                                    </div>
                                    {!error && (userData?.mid?.length < 20 && userData?.mid?.length != 0) ?
                                        <label className={styles.error}>Enter a valid MID
                                        </label> : ""
                                    }
                                    <div className={styles.textInput}>
                                        <TextField id="outlined-basic" label="Amount" variant="outlined"
                                                   value={userData?.amount}
                                                   className={styles.input}
                                                   onChange={(e) => setUserData((prevState) => ({
                                                       ...prevState,
                                                       amount: e.target.value
                                                   }))}
                                        />
                                    </div>

                                    <div className={styles.textInput}>
                                        <TextField id="outlined-basic" label="Description" variant="outlined"
                                                   value={userData?.description}
                                                   className={styles.input}
                                                   onChange={(e) => setUserData((prevState) => ({
                                                       ...prevState,
                                                       description: e.target.value
                                                   }))}/>
                                    </div>
                                    {!error && (userData?.description?.length < 3 && userData?.description?.length != 0) ?
                                        <label className={styles.error}>Enter a Description
                                        </label> : ""
                                    }
                                    <div className={styles.buttonStyle}>
                                        <button disabled={handleDisabled()}
                                                className={`${handleDisabled() ? styles.btn : styles.enabled}`}
                                                onClick={() => createPaytmLink()}>Create Link
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
            export default CreatePaytmLink