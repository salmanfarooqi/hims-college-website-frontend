import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from './components/Navigation'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

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
        <div>
          {children}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          aria-label="Notifications"
        />
      </body>
    </html>
  )
} 