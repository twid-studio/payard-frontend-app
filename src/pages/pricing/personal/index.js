import { URL_PERSONAL_PRICING } from "@/lib/helpers/DataUrls";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import dynamic from "next/dynamic";

const PricingPage = dynamic(() => import('@/components/PricingPage/PricingPage'), {
  ssr: false,
});


const Personal = () => {
  return (
    <DataProvider url={URL_PERSONAL_PRICING}>
      <PricingPage />
    </DataProvider>
  );
};

export default Personal;