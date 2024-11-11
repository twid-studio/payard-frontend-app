import { URL_PRIVACY } from "@/lib/helpers/DataUrls";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const PrivacyPage = dynamic(
  () => import("@/components/PrivacyPage/PrivacyPage"),
  {
    ssr: false,
  }
);

const PolicyPage = ({ slug }) => {
  return (
    <DataProvider url={URL_PRIVACY + slug}>
      <PrivacyPage key={slug} />
    </DataProvider>
  );
};

export default PolicyPage;

export async function getServerSideProps(context) {
  const { slug } = context.params;

  return { props: { slug } };
}
