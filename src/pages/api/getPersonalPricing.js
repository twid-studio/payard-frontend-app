import { groq } from "next-sanity";
import { sanityClient } from "../../../sanity";
import { seoPage } from "./seoPage";

const query = groq`
  *[_type == "pricingPersonalPage"][0] {
    title,
    validFrom,
    buttonGroup,
    "pricingTables": pricingPersonalTables[] -> {
      tableTitle,
      "tableSlug": tableSlug.current,
      underTables,
      "list": list[]{
        "tableHeaders": table.tableHeaders,
        "headerIcon": table.nameIcon.icon.asset->url,
        "tableRows": table.tableRows[] {
          values
        },
      },
      },
    ${seoPage}
  }
`;

// const query = groq`
//   *[_type == "pricingPersonal"][] {
//     tableTitle,
//     "tableSlug": tableSlug.current,
//     "list": list[]{
//       "tableHeaders": table.tableHeaders,
//       "tableRows": table.tableRows[] {
//         values
//       }
//     }
//   }
// `;

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
