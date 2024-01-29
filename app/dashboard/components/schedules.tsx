"use client";

import { CircleIcon, StarIcon } from "lucide-react";
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
import { toast } from "@/components/ui/use-toast";
import ScheduleUpload from "@/components/schedule-dialog";
import { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
type ScheduleProps = {
  id: string;
  authorId: string;
  time: string;
  title: string;
  endTime: string;
  date: Date;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}[];
const Schedules = ({ schedules }: { schedules: ScheduleProps }) => {
  const [loading, setLoading] = useState(false);
  const [loadingDelelte, setLoadingDelete] = useState(false);

  if (loadingDelelte) {
     toast({
      title: "Loading....",
      description:
        "Deleting the schedule....",
      variant: "default",
    });
  }

  const handleDelete = async (id: any) => {
    setLoadingDelete(true);
    const res = await fetch("/api/schedule/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    if (!res.ok) {
      return toast({
        title: "Something went wrong.",
        description: "We can't process it at this time . Please try again.",
        variant: "destructive",
      });
    } else {
      //   sendEmail();
      //   sendAdminEmail();

      return toast({
        title: "Successfully Updated",
        description: `You have updated your schedules status. `,
        variant: "default",
      });
    }
  };

  const handleComplete = async (id: any, status: boolean) => {
    setLoading(true);
    const res = await fetch("/api/schedule/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        status: status,
      }),
    });
    if (!res.ok) {
      return toast({
        title: "Something went wrong.",
        description: "We can't process it at this time . Please try again.",
        variant: "destructive",
      });
    } else {
      //   sendEmail();
      //   sendAdminEmail();

      return toast({
        title: "Successfully Updated",
        description: `You have updated your schedules status. `,
        variant: "default",
      });
    }
  };
  return (
    <>
      {schedules.map((r) => {
        return (
          <Card
            key={r.id}
            className="rounded-3xl relative  bg-gradient-to-tr from-purple-400/10 via-transparent to-transparent"
          >
            <CardHeader className="grid grid-cols-[1fr_10px] items-start gap-4 space-y-0 relative">
              <div className="space-y-3">
                <CardTitle>{r.title}</CardTitle>

                <CardDescription>{r.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex h-8 w-10 p-0 data-[state=open]:bg-muted"
                    >
                      <DotsHorizontalIcon className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem className="flex gap-2">
                      {loading && (
                        <Icons.spinner className=" inline mr-2 h-4 w-4 animate-spin" />
                      )}{" "}
                      <div
                        onClick={() => {
                          handleComplete(r.id, r.completed);
                        }}
                      >
                        Mark as {r.completed ? "Uncomplete" : "Complete"}
                      </div>{" "}
                    </DropdownMenuItem>
                    <DropdownMenuItem> Make a copy</DropdownMenuItem>
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
                    <DropdownMenuItem
                      onClick={() => {
                        handleDelete(r.id);
                      }}
                    >
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
                  {r.date.toLocaleDateString("en-GB")}
                </div>
                <br />
              </div>
              <div className="flex mt-2 justify-between text-muted-foreground">
                {/* <div className="flex items-center space-x-1 rounded-md bg-transparent text-secondary-foreground ">
                      <DownloadPage url={r.resourceUrl} />
                      <Separator orientation="vertical" className="h-[20px]" />
                    </div> */}
                <div className="">
                  <p>{timeAgo(r.updatedAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default Schedules;
