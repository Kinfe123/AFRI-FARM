import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/ui/shell";
import { UserNameForm } from "@/components/user-input-form";
import { getUser } from "@/lib/curruser";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadDialog from "../components/upload-dialog";
export const metadata = {
  title: "Upload",
  description: "Upload Resource",
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
          <div className="flex gap-2">
         <UploadDialog serverSesion={user} />
          </div>
        </div>

        <div>

        </div>
      </div>
    </DashboardShell>
  );
}
