'use client'

import { useUser } from '@clerk/nextjs'
import SignInButton from '../../components/SignInButton'
import { Button } from '../../components/ui/button'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { HeroSection } from '@/components/hero'


const apiKey = process.env.GOOGLE_CLIENT_ID

export default function Home() {

  const user = useUser()
  return (
  
    
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
       {/* hellow */}
       <HeroSection />
      
    </main>
  )
}

