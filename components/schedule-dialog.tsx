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
  console.log("THe serversession: ", serverSesion);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value, setValue] = useState("");
  const [values1, setValues1] = useState("grade11");
  const [applied, setApplied] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [date, setDate] = useState<Date>();

  const [uploadData, setUploadData] = useState({
    date: "",
    time: "",
    title: "",
    description: "",
  });

  const [clicked, setClicked] = useState(false);

  console.log("THe data are : ", serverSesion.id);

  const handleChange = (e: { target: { id: any; value: any } }) => {
    setUploadData({ ...uploadData, [e.target.id]: e.target.value });
  };
 

  const handleClick = async () => {
    setLoading(true);
    const req = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorId: serverSesion.id,

        time: uploadData.time,

        description: uploadData.description,
        date: date,
        title: uploadData.title,
      }),
    });

    console.log("The data as a response: ", req);
    setLoading(false);
    if (!req.ok) {
      return toast({
        title: "Something went wrong.",
        description:
          "We can't receive the schedule at the moment please try again later",
        variant: "destructive",
      });
    } else {
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
  const fetcher = async () => {
    const res = await fetch("/api/jobapplied");
    const json = await res.json();
    // return json
    // const mappedId = json.map((job: { jobId: any }) => job.jobId)

    // setApplicationInfo(mappedId)
  };
  useEffect(() => {
    fetcher();
  }, []);

  useEffect(() => {
    fetcher();
  }, [loading]);
  if (!serverSesion) {
    return (
      <div>
        If the world is ending..we all do have a code get compiled safely
      </div>
    );
  }

  const types_ = [
    {
      value: "pdf",
      label: "Pdf",
    },
    {
      value: "video",
      label: "Video",
    },
    {
      value: "cheatsheet",
      label: "Cheatsheet",
    },
    {
      value: "link",
      label: "Link",
    },
  ];

  const grades = [
    {
      value: "Grade9",
      label: "Grade 9",
    },
    {
      value: "Grade10",
      label: "Grade 10",
    },
    {
      value: "Grade11",
      label: "Grade 11",
    },
    {
      value: "Grade12",
      label: "Grade 12",
    },
  ];
  console.log("THe selected type : ", date);
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
          Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Fill in the infos for - {jobPosition}</DialogTitle>
          <DialogDescription>
            Make changes to your self by starting a journey with us.
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
              id="lastName"
              onChange={handleChange}
              value={uploadData.time}
              className="col-span-3"
              placeholder="HH:MM"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Title
            </Label>

            <Input
              id="lastName"
              onChange={handleChange}
              value={uploadData.title}
              className="col-span-3"
             
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
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
