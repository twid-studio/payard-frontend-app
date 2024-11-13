import { groq } from "next-sanity";
import { sanityClient } from "../../../sanity";

const query = groq`
  *[_type=="header"][0] {
    "linksList": links[] {
      title,
      type,
      ...select(
        type == 'dropdown' => {
          "options": dropDown[] {
            name,
            slug
          }
        },
        type == 'anchor' => {
          slug
        }
      )
    },
    "singInButtons": singInButtons[] {
      "link": buttonLink,
      "text": buttonText,
      type,
    },
  }
`;

export default async function handler(req, res) {
  try {
    console.log(`Attempting to fetch SEOdata from Sanity`);
    const seo = await sanityClient.fetch(query);

    if (!seo) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json(seo);
  } catch (error) {
    console.error(`Error fetching data from Sanity:`, error);
    res.status(500).json({
      message: error.message,
    });
  }
}
