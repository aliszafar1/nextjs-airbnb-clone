import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'


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
      <body className={font.className}>{children}</body>
    </html>
  )
}
