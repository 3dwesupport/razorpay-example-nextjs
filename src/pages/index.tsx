import {Inter} from 'next/font/google'
import {useRouter} from "next/router";
import {Button} from "@mui/material";
import styles from "@/styles/Home.module.css";
import CreateOrder from "@/pages/createOrder";

export default function Home() {
    const router = useRouter();
    const showPaymentGateway = async () => {
        await router.push({
            pathname: "/paymentGateWay",
        });
    }
    const showCreateOrder = async () => {
        await router.push({
            pathname: "/createOrder",
        });
    }
    return (
        <>
            <div className={styles.home}>
                <Button onClick={showCreateOrder}>Create Order</Button>
                <Button onClick={showPaymentGateway}>Complete Payment</Button>
            </div>
        </>
    )
}
