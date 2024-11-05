import PricingPage from "@/components/PricingPage/PricingPage";
import { URL_PERSONAL_PRICING } from "@/lib/helpers/DataUrls";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";

const Personal = () => {
  return (
    <>
      <DataProvider url={URL_PERSONAL_PRICING}>
        <PricingPage />
      </DataProvider>
    </>
  );
};

export default Personal;
