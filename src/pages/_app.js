import "@/styles/reset.scss";
import { CookiePopUp } from "@/utils/CookiePopUp/CookiePopUp";
import { AnimatePresence } from "framer-motion";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";

const queryC = new QueryClient();

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-XG58B9L0S1`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XG58B9L0S1');
          `,
        }}
      />
      <div className="main">
        <QueryClientProvider client={queryC}>
          <AnimatePresence mode="wait">
            <Component key={router.route} {...pageProps} />
            <CookiePopUp />
          </AnimatePresence>
        </QueryClientProvider>
      </div>
    </>
  );
}
