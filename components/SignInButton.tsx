'use client'

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import { useClerk } from "@clerk/nextjs"


type SignInProps = {
    text: string

}


const SignInButton = (props : SignInProps) => {

    const clerk = useClerk()
    const {text} = props

    const handleClick = async () => {
        await clerk.openSignIn()
    }


    return (
        <Button onClick={handleClick} className="rounded-lg">
            {text}
        
        </Button>
    )

}
export default SignInButton