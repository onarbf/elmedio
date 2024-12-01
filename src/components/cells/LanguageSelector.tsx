"use client";
import _ from "@/constants";
import { usePathname, useRouter } from "@/utils/i18n/routing";
import { useLocale } from "next-intl";

export default function LanguageSelector() {
  const activeLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLanguage(locale: string) {
    router.replace(pathname, { locale });
  }

  return (
    <select
      className="bg-inherit"
      value={activeLocale}
      onChange={(e) => switchLanguage(e.target.value)}
    >
      {_.locales.map((locale) => (
        <option key={locale} value={locale} className="bg-inherit">
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
