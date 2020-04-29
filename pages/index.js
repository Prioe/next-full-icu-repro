import Head from 'next/head'
import { IntlProvider, FormattedDate } from 'react-intl'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>full-icu Repro</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <IntlProvider locale="de" messages={{}}>
          <FormattedDate value={new Date()}></FormattedDate>
        </IntlProvider>
      </main>

    </div>
  )
}
