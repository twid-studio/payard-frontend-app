import { groq } from "next-sanity";
import { sanityClient } from "../../../sanity";

const pricingPreviewHome1 = `
  *[_type == "homePage"][0] {
    "pricingPreview": *[_type == "pricingPreviewHome"][0] {
      title, // Title containing "edgy" and "base"
      "cards": cards[] {
        settings, // Contains cardColor and type
        "table": table[] {
          "tableHeaders": table.tableHeaders, // Table headers
          "tableRows": table.tableRows[].values {
              name, // Name of the fee
              secondValues // Fixed fees
          }
        }
      }
    }
  }
`;

const pricingPreviewHome = `
  "pricingPreview": *[_type == "pricingPreviewHome"][0] {
      title,
      text,
      "cards": cards[] {
        settings,
        buttonGroup,
        "table": table[] {
          "tableHeaders": table.tableHeaders,
          "tableRows": table.tableRows[].values {
              name,
              secondValues,
              thirdValues,
          }
        },
        "tableBottom": tableBottom[] {
            title,
          "tableHeaders": table.tableHeaders,
          "tableRows": table.tableRows[].values {
              name,
              secondValues,
              thirdValues,
          }
        }
      }
    }
`;

const heroCards = `
  "heroCards": heroCards.list[] {
    title,
    popUpText,
    "video": video.asset->url,
    buttonGroup,
  },
`;

const services = `
  "services": services{
    buttonGroup,
    "cards": cards[] {
      ...,
      "bg": bg.asset->url,
      "icon": icon.asset->url
    } 
  },
`;

const privileges = `
  "privileges": privileges.list[] {
    title,
    text,
    "icon": icon.asset->url
  },
`;

const whyPayard = `
  "whyPayard": whyPayard.list[] {
    text, title
  },
`;

const consulting = `
  "consulting": consulting{
    buttonGroup,
    "list": list[] {
      title, text
    }
  },
`;

const features = `
  "features": features.list[] {
    title,
    text, 
    "icon": icon.asset->url,
  },
`;

const appInstruction = `"appInstruction": appInstruction.asset->url,`;

const signUpInstruction = `"signUpInstruction": signUpInstruction.asset->url,`;

const query = groq`
  *[_type == "homePage"][0] {
    ${heroCards}
    ${services}
    ${privileges}
    ${whyPayard}
    ${consulting} 
    ${appInstruction}
    ${signUpInstruction}
    ${features} 
    ${pricingPreviewHome}
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
