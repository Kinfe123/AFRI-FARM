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

import FilePage from "./file-display";
// import { MultiFileDropzone } from "./file-upload"
import { Icons } from "@/components/icons";
import { toast } from "@/components/ui/use-toast";
// import div>If the world is ending..we all do have a code get compiled safely</div>om "./popup-dialog"

function UploadDialog({ serverSesion, jobPosition }: any) {
  console.log("THe serversession: ", serverSesion);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [applied, setApplied] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [applicationInfo, setApplicationInfo] = useState([]);
  const [texthelper, setTextHelper] = useState<"Apply" | "Applied">("Apply");
  const [uploadData, setUploadData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    resouceUrl: "",
    description: "",
    title: ""
  });

  const [clicked, setClicked] = useState(false);

  console.log("THe data are : ", serverSesion.id);

  const handleChange = (e: { target: { id: any; value: any } }) => {
    setUploadData({ ...uploadData, [e.target.id]: e.target.value });
  };
  const handleParentUpdate = (newVal: any) => {
    setUploadData({ ...uploadData, resouceUrl: newVal });
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
        firstName: uploadData.firstName,
        lastName: uploadData.lastName,
        email: serverSesion.emailAddresses[0].emailAddress,
        resourceUrl: uploadData.resouceUrl,
        description: uploadData.description,
        type: value,
        title: uploadData.title
      }),
    });

    console.log("The data as a response: " , req)
    setLoading(false);
    if (!req.ok) {
      return toast({
        title: "Something went wrong.",
        description: "We can't receive the resources at the moment . Please try again.",
        variant: "destructive",
      });
    } else {
      //   sendEmail();
      //   sendAdminEmail();
      setDisableSubmit(true);
      return toast({
        title: "Successfully Sent",
        description: `Thanks ${uploadData.firstName} You have successfully uploaded a resource for talent pool. `,
        variant: "default",
      });
    }

    // function call to send an email to user who applied to us.
  };

  //   const sendEmail = async () => {
  //     const response = await fetch("/api/send", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         name: uploadData.firstName + " " + uploadData.lastName,
  //         emailAddress: uploadData.email,
  //         jobPosition: jobPosition,
  //       }),
  //     });
  //     const jsonResponse = await response.json();
  //     // console.log("THe response comes as json : " , jsonResponse)
  //   };
  //   const sendAdminEmail = async () => {
  //     const response = await fetch("/api/send-admin", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         name: uploadData.firstName + " " + uploadData.lastName,
  //         emailAddress: uploadData.email,
  //         jobPosition: jobPosition,
  //         resumeLink: uploadData.resumeLink,
  //         resouceUrl: uploadData.resouceUrl,
  //         portfolioLink: uploadData.portfolioLink,
  //         referredFrom: uploadData.referredFrom,
  //       }),
  //     });
  //     const jsonResponse = await response.json();
  //     // console.log("THe response comes as json : " , jsonResponse)
  //   };

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

  return (
    <Dialog>
      {applied && (
        <p className="flex   mx0-auto tracking-normal text-muted-foreground justify-center items-center mt-10 mb-10">
          You have already applied for the job!
        </p>
      )}
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
              First Name
            </Label>

            <Input
              id="firstName"
              onChange={handleChange}
              value={uploadData.firstName}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Last Name
            </Label>

            <Input
              id="lastName"
              onChange={handleChange}
              value={uploadData.lastName}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
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
          <Label htmlFor="username" className="text-right">
              Type
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {value
                    ? types_.find((framework) => framework.value === value)
                        ?.label
                    : "Select Type  ..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search Type..." />
                  <CommandEmpty>No Type found.</CommandEmpty>
                  <CommandGroup>
                    {types_.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === framework.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
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

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or Upload Your Resource
            </span>
          </div>
          <div className="flex justify-end items-end">
            <FilePage updateData={handleParentUpdate} />
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

export default UploadDialog;
