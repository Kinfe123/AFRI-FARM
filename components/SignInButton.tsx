'use client'

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"

type SignInProps = {
    text: string

}


const SignInButton = (props : SignInProps) => {
    const {text} = props

    const handleClick = async  () => {
        console.log("Client side code fired")
        await signIn('google')
    }
    return (
        <Button onClick={handleClick} className="rounded-lg">
            {text}
        
        </Button>
    )

}
export default SignInButton