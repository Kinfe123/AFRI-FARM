import { Button  , buttonVariants} from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex justify-center items-center flex-col'>
        <h1>Hello world </h1>
        <Button className='text-white' size='lg' >Click me</Button>

      </div>
    </main>
  )
}
