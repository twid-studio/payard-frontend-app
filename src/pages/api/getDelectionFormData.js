import { groq } from "next-sanity";
import { sanityClient } from "../../../sanity";
import { seoPage } from "./seoPage";

const query = groq`
  *[_type == "delectionForm"][0] {
     "form": form {
      email,
      "sucessText": sucessText {
        sucessTitle,
        sucessSubtitle,
        "sucessIcon": sucessIcon.asset->url,
      },
      "formText": {
        "title": formText.title,
        "subtitle": formText.subtitle,
        "policyButton": formText.formText,
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
