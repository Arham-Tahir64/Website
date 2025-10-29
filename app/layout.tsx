import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arham Tahir — Portfolio',
  description: 'AI Engineer / Full-Stack Developer / Builder',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}

