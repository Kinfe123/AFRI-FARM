"use client";
import { json } from "stream/consumers";
import { useEffect, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { HelperText } from "flowbite-react";
import { Textarea } from "@/components/ui/textarea";
import { getServerSession } from "next-auth";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Icons } from "@/components/icons";
import { toast } from "@/components/ui/use-toast";
import { SchedulePicker } from "./calender-schdule";

function ScheduleUpload({ serverSesion, jobPosition }: any) {
  const [loading, setLoading] = useState(false);

  const [disableSubmit, setDisableSubmit] = useState(false);
  const [date, setDate] = useState<Date>();

  const [uploadData, setUploadData] = useState({
    date: "",
    time: "",
    endTime: "",
    title: "",
    description: "",
  });

  const [clicked, setClicked] = useState(false);



  const handleChange = (e: { target: { id: any; value: any } }) => {
    setUploadData({ ...uploadData, [e.target.id]: e.target.value });
  };
 

 
  const handleClick = async () => {

    setLoading(true);
    const req = await fetch("/api/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorId: serverSesion.id,
        time: uploadData.time,
        endTime: uploadData.endTime,
        description: uploadData.description,
        date: date,
        title: uploadData.title,
        completed: false,
        
      }),
    });

    console.log("The data as a response from scheduling: ", req);
    setLoading(false);
    if (!req.ok) {
      return toast({
        title: "Something went wrong.",
        description:
          "We can't receive the schedule at the moment please try again later",
        variant: "destructive",
      });
    } else   {
      //   sendEmail();
      //   sendAdminEmail();
      setDisableSubmit(true);
      return toast({
        title: "Successfully Sent",
        description: `Thanks  You have successfully set a schedule. `,
        variant: "default",
      });
    }

    // function call to send an email to user who applied to us.
  };

  //   const disbales = jobApplied.includes(jobId)


  return (
    <Dialog>
      {/* {applied && (
        <p className="flex   mx0-auto tracking-normal text-muted-foreground justify-center items-center mt-10 mb-10">
          You have already applied for the job!
        </p>
      )} */}
      <DialogTrigger asChild>
        {/* {jobApplied.includes(jobId) && (<Button variant="outline" size='lg' className="bg-gray-800 text-white   transition ease-in-out duration-150 dark:bg-white  dark:text-black" disabled={true}>Applied</Button>) } */}

        <Button
          variant="outline"
          size="lg"
          className="bg-gray-800 my-5 text-white  mx-auto flex justify-center items-center   transition ease-in-out duration-150 dark:bg-white  dark:text-black"
        >
          Schedule  
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule Your Study</DialogTitle>
          <DialogDescription>
           Schedule yourself a time and gear up stuff.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Schedule Time
            </Label>
            {/* @ts-ignore */}
            <SchedulePicker date={date!} setDate={setDate!} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Time
            </Label>

            <Input
              id="time"
              onChange={handleChange}
              value={uploadData.time}
              className="col-span-3"
              placeholder="HH:MM"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              End Time
            </Label>

            <Input
              id="endTime"
              onChange={handleChange}
              value={uploadData.endTime}
              className="col-span-3"
              placeholder="HH:MM"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>

            <Input
              id="title"
              onChange={handleChange}
              value={uploadData.title}
              className="col-span-3"
             
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={uploadData.description}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <button
            className={cn(buttonVariants())}
            disabled={loading || disableSubmit}
            onClick={handleClick}
          >
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ScheduleUpload;
