import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/ui/shell";
import { UserNameForm } from "@/components/user-input-form";
import { getUser } from "@/lib/curruser";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadDialog from "../components/upload-dialog";
export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Upload" text="Manage Resources." />
      <div className="grid gap-10">
        <div className="flex justify-between items-center">
          <div>List of available resources</div>
          {/* <Button className="bg-gradient-to-tr from-purple-400/30 via-purple-400/10 to-orange-400/10 bordeer-["> */}
            <Plus className="w-4 h-4 mr-1" /> <UploadDialog serverSesion={user} />
          {/* </Button> */}
        </div>

        <div>

        </div>
      </div>
    </DashboardShell>
  );
}
