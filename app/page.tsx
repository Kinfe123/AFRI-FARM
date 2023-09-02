import SignInButton from '@/components/SignInButton'
import { Button  , buttonVariants} from '@/components/ui/button'
import Image from 'next/image'

const apiKey = process.env.GOOGLE_CLIENT_ID

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex justify-center items-center flex-col'>
        <h1>Hello world </h1>
        <p>CHeck123 , from Farmers</p>
        <SignInButton text="Sign in with google" />

      </div>
    </main>
  )
}
