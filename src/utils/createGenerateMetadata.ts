import _ from "@/constants";
import { getTranslations } from "next-intl/server";

export default function createGenerateMetadata(namespace: string) {
  return async function generateMetadata({
    params,
  }: {
    params: { locale: string };
  }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace });

    return {
      title: t("title")?.trim() || _.metadata.title,
      description: t("description")?.trim() || _.metadata.description,
      alternates: _.metadata.alternates, // Puedes añadir más propiedades si lo deseas
    };
  };
}
