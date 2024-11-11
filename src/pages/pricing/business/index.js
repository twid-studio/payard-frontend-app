import { URL_BUSINESS_PRICING } from "@/lib/helpers/DataUrls";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import dynamic from "next/dynamic";

const PricingPage = dynamic(() => import('@/components/PricingPage/PricingPage'), {
  ssr: false,
});

const Business = () => {
  return (
    <DataProvider url={URL_BUSINESS_PRICING}>
      <PricingPage type="business" theme="black"/>
    </DataProvider>
  );
};

export default Business;
