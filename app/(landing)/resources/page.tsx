import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/ui/shell";
import { UserNameForm } from "@/components/user-input-form";
import { getUser } from "@/lib/curruser";


import { prisma } from "@/lib/db";
import DownloadPage from "../../dashboard/components/download";
import { timeAgo } from "@/lib/utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Background from "@/components/landing/blur-background/background";
import Resources from "@/app/dashboard/components/resources";
export const metadata = {
  title: "Explore",
  description: "Explore Resources",
};

export default async function SettingsPage() {
  const user = await getUser();



  const resources = await prisma.resource.findMany({});

  console.log("The resource: ", resources);

  if (!user) {
    redirect("/login");
  }

  const handleDelete = async (id: any) => {
    const req = await fetch("/api/upload/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const res = await req.json();
    console.log("The reponse :", res);
  };

  return (
    <div className="mx-20 mt-20 ">
      <DashboardHeader heading="Explore " text="Explore Resources." />
      <div className="mt-10 grid gap-10 ">
        <div className="flex justify-between items-center">
          <div>List of available resources</div>
          <Background />
          {/* <div className="flex gap-2">
            <UploadDialog serverSesion={user} />
          </div> */}
        </div>

        <div className="grid grid-cols-1 gap-4 mt-10  md:grid-cols-2 lg:grid-cols-3 max-w-6xl self-center">
           <Resources resources={resources}/>
        </div>
      </div>
    </div>
  );
}
