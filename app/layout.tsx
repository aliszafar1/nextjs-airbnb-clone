import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/navbar'
import LoginModal from './components/modals/loginModal'
import ClientOnly from './components/clientOnly'
import RegisterModal from './components/modals/registerModal'


export const metadata: Metadata = {
  title: 'NextJS AirBnB',
  description: 'Practicing NextJS to clone AirBnB',
}

const font = Nunito ({
  subsets: ["latin"]
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
        <Navbar />
        <RegisterModal />
        <LoginModal />
        </ClientOnly>
        {children}
        </body>
    </html>
  )
}
