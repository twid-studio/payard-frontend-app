import { URL_BUSINESS_PRICING, URL_SEO_BASE } from "@/lib/helpers/DataUrls";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import { PageHead } from "@/utils/PageHead/PageHead";
import dynamic from "next/dynamic";

const PricingPage = dynamic(() => import('@/components/PricingPage/PricingPage'), {
  ssr: false,
});

const Business = ({ data }) => {
  return (
    <>
      <PageHead data={data.seo} />
      <DataProvider url={URL_BUSINESS_PRICING}>
        <PricingPage type="business" theme="black"/>
      </DataProvider>
    </>
  );
};

export default Business;

export async function getServerSideProps() {
  try {
    const response = await fetch(URL_BUSINESS_PRICING, {
      cache: "no-cache",
      revalidate: 100,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    console.log("DATA ===>", data);

    return { props: { data } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: {} };
  }
}
