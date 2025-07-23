import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from './components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HIMS Degree College - Empowering Future Leaders',
  description: 'A premier educational institution dedicated to academic excellence, innovation, and character development. Join us in shaping the leaders of tomorrow.',
  keywords: 'HIMS Degree College, college, education, university, academic excellence, higher education, FSC Pre-Medical, FSC Engineering, ICS Computer Science',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  )
} 