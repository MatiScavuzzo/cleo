import { UserProvider } from '@auth0/nextjs-auth0/client'
import { Footer } from './Footer'
import { Header } from './Header'
import { Lustria } from 'next/font/google'
import { SWRConfig } from 'swr'

const lustria = Lustria({ subsets: ['latin'], weight: '400', })

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const metadata = {
  title: 'Cleo Tienda',
  description: 'Tienda de ropa femenina',
}

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <SWRConfig value={{ fetcher }}>
      <UserProvider>
        <Header className={lustria.className} />
        {children}
        <Footer />
      </UserProvider>
    </SWRConfig>
  )
}