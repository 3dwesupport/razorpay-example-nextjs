import Image from "next/image";
import paytmLogo from "../../public/paytm.png";
import razorpayLogo from "../../public/Razorpay.png";
import styles from "../styles//Home.module.css";

/**
 * Render Gateway Icon with text on home screen
 * @constructor
 */
export const GateWayIcon = () => {
    return (
        <div className={styles.LeftDiv}>
            <div className={styles.imageLogo}>
                <Image
                    src={paytmLogo}
                    alt="Picture of the author"
                    className={styles.razorpayImage}
                    // width="39%"
                    // height="200%"
                />
                <Image
                    src={razorpayLogo}
                    alt="Picture of the author"
                    className={styles.razorpayImage}
                    // width="40%"
                    // height="200%"
                />
            </div>
            <div className={styles.headingGatway}>
                Test Payment Gateways
            </div>
        </div>
    )
}