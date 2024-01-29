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

import { prisma } from "@/lib/db";
import ScheduleUpload from "@/components/schedule-dialog";
import Schedules from "../components/schedules";
export const metadata = {
  title: "Schedule",
  description: "Schedule Your Study Time",
};

export default async function SchedulePage() {
  const user = await getUser();
 
  const schedules = await prisma.schedule.findMany({
    where: {
      authorId: user?.id
    }
  });


  return (
    <DashboardShell>
      <DashboardHeader heading="Schedule " text="Schedule your study time." />
      <div className="grid gap-10">
        <div className="flex justify-between items-center">
          <div>List of available schedule</div>

          <div className="flex gap-2">
            <ScheduleUpload serverSesion={user} />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* @ts-ignore */}
            <Schedules schedules={schedules} />
          </div>
        </div>

        <div>
          {/* <p className="text-center text-2xl flex justify-center items-center">There is no available schedule currenty</p> */}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"></div>
      </div>
    </DashboardShell>
  );
}
