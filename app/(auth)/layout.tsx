import { ClerkProvider } from "@clerk/nextjs"

export const metadata = {
  title: 'AfriFarm - Join Us',
  description: 'learn for best',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider>

      <body>{children}</body>
      </ClerkProvider>
    </html>
  )
}
