import { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";
import paytmConfig from "./api/config";

export default function Document() {
  // @ts-ignore
    return (
    <Html lang="en">
      <Head />
        <Script type="application/javascript"
                src={`${paytmConfig.PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${paytmConfig.mid}.js`}
                crossOrigin="anonymous"/>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
