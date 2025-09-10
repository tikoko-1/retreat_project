import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { SiteCopyProvider } from '@/contexts/SiteCopyContext'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Retreat Centers Platform - Premium B2B Platform for Yoga Teachers & Coaches',
  description: 'Discover premium retreat centers and venues for yoga teachers, coaches, and retreat organizers. Find the perfect space for your transformational programs.',
  keywords: 'retreat centers, yoga retreats, wellness venues, meditation centers, spiritual retreats',
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%23111'/%3E%3Cpath d='M20 40c0-8 6-16 12-16s12 8 12 16' stroke='%23fff' stroke-width='4' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='32' cy='26' r='4' fill='%23fff'/%3E%3C/svg%3E",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full bg-white`}>
        <SiteCopyProvider>
          {children}
        </SiteCopyProvider>
      </body>
    </html>
  )
}