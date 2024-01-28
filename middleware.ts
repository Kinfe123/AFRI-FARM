import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({});
 
export const config = {
  matcher: ["/dashboard" , "/dashboard/progress" , '/dashboard/schedule', '/resources' , '/dashboard/upload'  , '/dashboard/account', "/(api|trpc)(.*)"],
};