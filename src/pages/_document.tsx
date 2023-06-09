import {Head, Html, Main, NextScript} from 'next/document'
import Script from "next/script";
import paytmConfig from "./api/config";

export default function Document() {
    return (
        <Html lang="en">
            <Head/>
            <body>
            <Main/>
            <NextScript/>
            <Script type="application/javascript"
                    src={`${paytmConfig.PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${paytmConfig.mid}.js`}
                    crossOrigin="anonymous"/>
            </body>
        </Html>
    )
}
