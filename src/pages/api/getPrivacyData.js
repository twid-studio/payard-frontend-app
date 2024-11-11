import { groq } from "next-sanity";
import { sanityClient } from "../../../sanity";

const query = groq`
    *[_type == "privacyPage" && slug.current == $slug][0] {
      ...,
    }
`;

export default async function handler(req, res) {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ message: "Slug parameter is required" });
  }

  try {
    console.log(`Attempting to fetch data from Sanity for slug: ${slug}`);
    const post = await sanityClient.fetch(query, {
      slug,
    });

    if (!post) {
      console.log(`No data received from Sanity for slug: ${slug}`);
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(`Error fetching data from Sanity for slug ${slug}:`, error);
    res.status(500).json({
      message: error.message,
    });
  }
}
