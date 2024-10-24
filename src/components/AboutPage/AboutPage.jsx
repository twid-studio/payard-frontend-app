import { useEffect } from "react";

import Image from "next/image";
import { PageLayout } from "@/utils/PageLayout/PageLayout";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <PageLayout>
      <div style={{ width: "100vw", height: "200vh", position: "relative" }}>
        <Image
          src="https://images.beta.cosmos.so/9369005b-bbf3-49a1-89cf-0587f1e53347?format=jpeg"
          fill
          alt=""
        />
      </div>
    </PageLayout>
  );
}

export default AboutPage