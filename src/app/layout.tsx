import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Retreat Centers Platform - Premium B2B Platform for Yoga Teachers & Coaches',
  description: 'Discover premium retreat centers and venues for yoga teachers, coaches, and retreat organizers. Find the perfect space for your transformational programs.',
  keywords: 'retreat centers, yoga retreats, wellness venues, meditation centers, spiritual retreats',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-white`}>
        {children}
      </body>
    </html>
  )
}