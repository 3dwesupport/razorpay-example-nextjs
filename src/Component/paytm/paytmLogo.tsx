import Image from "next/image";
import paytmLogo from "../../../public/paytm.png";
import styles from "@/styles/Home.module.css";

/**
 * render paytm logo and text on screen
 * @constructor
 */
// @ts-ignore
export const PaytmLogo = () => {
    return (
        <>
            <div className={styles.LeftDiv}>
                <div className={styles.image}>
                    <Image
                        src={paytmLogo}
                        alt="Paytm Logo "
                        className={styles.razorpayImage}
                    />
                </div>
                <div className={styles.text}>
                    Test Paytm Gateway
                </div>
            </div>
        </>
    )
}