import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StoreProvider from './StoreProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vacation Buddy',
  description: 'A trip advisor provide insights of attractions, restaurants and hotels.'
}

export default function RootLayout({ children, search }: { children: React.ReactNode; search: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}
