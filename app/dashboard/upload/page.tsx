import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/ui/shell";
import { UserNameForm } from "@/components/user-input-form";
import { getUser } from "@/lib/curruser";
import {
  ChevronDownIcon,
  CircleIcon,
  Download,
  Option,
  PlusIcon,
  StarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadDialog from "../components/upload-dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import { prisma } from "@/lib/db";
import DownloadPage from "../components/download";
import { timeAgo } from "@/lib/utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Resources from "../components/resources";
export const metadata = {
  title: "Upload",
  description: "Upload Resource",
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
    <DashboardShell>
      <DashboardHeader heading="Upload" text="Manage Resources." />
      <div className="grid gap-10">
        <div className="flex justify-between items-center">
          <div>List of available resources</div>
          <div className="flex gap-2">
            <UploadDialog serverSesion={user} />
          </div>
        </div>

        <Resources resources={resources} />
      </div>
    </DashboardShell>
  );
}
