'use client'

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import { useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"


type SignInProps = {
    text: string

}


const SignInButton = (props : SignInProps) => {

    const clerk = useClerk()
    const router = useRouter()
    const {text} = props

    const handleClick = async () => {
    //  router.push("/login")   
    await clerk.openSignIn()
    }


    return (
        <Button onClick={handleClick} className="rounded-lg">
            {text}
        
        </Button>
    )

}
export default SignInButton