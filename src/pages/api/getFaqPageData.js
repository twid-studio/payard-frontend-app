import { groq } from "next-sanity";
import { sanityClient } from "../../../sanity";
import { seoPage } from "./seoPage";

const query = groq`
  *[_type == "faqPage"][0] {
    title,
    buttons,
    faqSections[]->{
      sectionTitle,
      "color": favoriteColor.hex,
      "sectionslug": sectionlug.current,
      "list": list[].item {
        title,
        body
      },
    },
    ${seoPage}
  }
`;

export default async function handler(req, res) {
  try {
    console.log("Attempting to fetch data from Sanity...");
    const data = await sanityClient.fetch(query);

    if (!data) {
      console.log("No data received from Sanity");
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    res.status(500).json({
      message: error.message,
    });
  }
}
