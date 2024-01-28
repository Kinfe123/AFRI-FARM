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
import ScheduleUpload from "@/components/schedule-dialog";
export const metadata = {
  title: "Schedule",
  description: "Schedule Your Study Time",
};

export default async function SchedulePage() {
  const user = await getUser();
  const schedules = await prisma.schedule.findMany({})




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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {schedules.map((r) => {
            return (
              //   <div key={r.id} className="flex flex-col gap-2  items-start rounded-2xl border-[0.112px] border-none h-[300px] bg-gradient-to-tr from-purple-400/10 via-transparent to-transparent">

              //      <div>

              //      <h1 className="text-muted-foreground font-sans">Test header</h1>
              //      <p>Test description goes here for moer clarification</p>
              //      <div className="flex justify-between items-center">
              //         <p>7 min ago</p>
              //         <button>
              //             download
              //         </button>
              //      </div>
              //      </div>
              //   </div>
              <Card
                key={r.id}
                className="rounded-3xl relative  bg-gradient-to-tr from-purple-400/10 via-transparent to-transparent"
              >
                <CardHeader className="grid grid-cols-[1fr_10px] items-start gap-4 space-y-0 relative">
                  <div className="space-y-3">
                    <CardTitle>{r.time}</CardTitle>

                    <CardDescription>{r.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                        >
                          <DotsHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Make a copy</DropdownMenuItem>
                        <DropdownMenuItem>Favorite</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            Labels
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuRadioGroup value={task.label}>
                              {labels.map((label) => (
                                <DropdownMenuRadioItem
                                  key={label.value}
                                  value={label.value}
                                >
                                  {label.label}
                                </DropdownMenuRadioItem>
                              ))}
                            </DropdownMenuRadioGroup>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          Delete
                          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                      {r.time} - {r.endTime} 
                    </div>
                    <div className="flex items-center">
                      <StarIcon className="mr-1 h-3 w-3" />
                      {new Date(r.date)}
                    </div>
                    <br />
                  </div>
                  <div className="flex mt-2 justify-between text-muted-foreground">
                    <div className="flex items-center space-x-1 rounded-md bg-transparent text-secondary-foreground ">
                      <DownloadPage url={r.resourceUrl} />
                      <Separator orientation="vertical" className="h-[20px]" />
                    </div>
                    <div className="">
                      <p>{timeAgo(r.updatedAt)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

          <div>
            <p className="text-center text-2xl flex justify-center items-center">There is no available schedule currenty</p>

          </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        </div>
      </div>
    </DashboardShell>
  );
}
