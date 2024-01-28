import { prisma } from "@/lib/db"


export const metadata = {
    title: "Progress",
    description: "Track your progress   ",
  };
  
const Progress = async () => {
    const tasks = await (await prisma.schedule.findMany({})).filter(r => r.completed)
    console.log('The task lenght is: ' , tasks)
    return (
        <div>
            Progress Page
        </div>
    )
}


export default Progress