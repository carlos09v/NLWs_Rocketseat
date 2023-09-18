import { ReactNode } from 'react'
import './globals.css'
import { Roboto_Flex as Roboto, Bai_Jamjuree as BaiJajuree } from 'next/font/google'
import { cookies } from 'next/headers'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJajuree({ subsets: ['latin'], weight: '700', variable: "--font-bai-jamjuree" })
import { Copyright } from '@/components/Copyright'
import { Hero } from '@/components/Hero'
import SignIn from '@/components/SignIn'
import Profile from '@/components/Profile'


export const metadata = {
  title: 'NLW Spacetime',
  description: 'Uma cápsula do tempo contruida com React, Next.js, TailwindCSS e TypeScript.',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="en">
      <body className={`font-sans ${roboto.variable} ${baiJamjuree.variable} text-gray-100 bg-gray-900`}>
        <main className='grid grid-cols-2 min-h-screen'>
          {/* Left */}
          <div className='bg-[url(../assets/bg-stars.svg)] bg-cover flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-r border-white/10'>
            {/* Blur */}
            <div className='absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 bg-purple-700 opacity-50 rounded-full blur-full' />

            {/* Stripes */}
            <div className='absolute right-2 top-0 bottom-0 w-2 bg-stripes' />

            {/* SIGN IN */}
            {isAuthenticated ? <Profile /> : <SignIn />}

            {/* Hero */}
            <Hero />

            {/* Copyright */}
            <Copyright />
          </div>

          {/* Right */}
          <div className='flex max-h-screen overflow-y-scroll flex-col bg-[url(../assets/bg-stars.svg)] bg-cover'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
