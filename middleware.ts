import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({});
 
export const config = {
  matcher: ["/dashboard"  , '/schedule', '/resources' , '/dashboard/upload', "/(api|trpc)(.*)"],
};