import styles from "@/constants/styles";

const websiteUrl = "localhost:3000";
const defaultLocale = "en";

const _ = {
  metadata: {
    title: "New website",
    description: "New website Description",
    alternates: {
      canonical: `${websiteUrl}/${defaultLocale}`,
      languages: {
        es: `${websiteUrl}/en/${defaultLocale}`,
      },
    },
  },
  websiteUrl,
  styles,
  defaultLocale,
  locales: ["en", "es"] as const,
} as const;

export default _;
