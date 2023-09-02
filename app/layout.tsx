import './globals.css'
import type { Metadata } from 'next'
import { Inter  , Poppins } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin-ext'] , weight:'400' })

export const metadata: Metadata = {
  title: 'Afri-Farm - Learn for best ',
  description: 'Learn from best and for best',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
