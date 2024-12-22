import '@/styles/globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import Navbar from '@/components/cells/Navbar'
import Footer from '@/components/cells/Footer'
import { notFound } from 'next/navigation'
import { routing } from '@/utils/i18n/routing'
import { ReactElement } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import createGenerateMetadata from '@/utils/createGenerateMetadata'

export function generateStaticParams() {
  return [{ locale: 'es' }]
}

export const generateMetadata = createGenerateMetadata({ namespace: 'Default.Metadata' })

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactElement
  params: any
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages({ locale })

  return (
    <html
      lang={locale}
      className="font-sans antialiased bg-main-100 dark:bg-main-900 dark:text-main-100"
    >
      <link rel="icon" href="/img/favicon-dark.ico" sizes="any" />
      <GoogleTagManager gtmId="GTM-WWSPHB4C" />
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <div className="mt-16">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
