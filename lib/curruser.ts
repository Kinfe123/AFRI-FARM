import { auth , clerkClient } from "@clerk/nextjs";

export const getUser = async () => {
    const {userId} = await auth()
    if(!userId){
        return null;
    }else {
        const user = await clerkClient.users.getUser(userId)
    

        return user

    }
}