import { ScrollProvider } from "@/lib/providers/ScrollProvider/ScrollProvider";
import "@/styles/reset.scss";
import Header from "@/utils/Header/Header";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";

const queryC = new QueryClient();

export default function App({ Component, pageProps, router }) {
  return (
    <div className="main">
      <Head>
        <title>PaYard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>

      <QueryClientProvider client={queryC}>
        <ScrollProvider>
          <Header />
          <AnimatePresence mode="wait">
            <Component key={router.route} {...pageProps} />
          </AnimatePresence>
        </ScrollProvider>
      </QueryClientProvider>
    </div>
  );
}
