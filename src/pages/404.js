import { PageHead } from "@/utils/PageHead/PageHead";
import { PageLayout } from "@/utils/PageLayout/PageLayout";

const data = {
  pageTitle: "PaYard",
  metaTitle: "This page does not exists(((("
}

export default function Custom404() {
  return (
    <>
      <PageHead data={data} />
      <PageLayout>
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <h1>404 - Page Not Found</h1>
        </div>
      </PageLayout>
    </>
  )
}