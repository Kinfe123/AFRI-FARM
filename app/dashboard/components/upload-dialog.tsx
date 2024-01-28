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
  const [open2, setOpen2] = useState(false);
  const [value, setValue] = useState("");
  const [values1, setValues1] = useState("grade11");
  const [applied, setApplied] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const [uploadData, setUploadData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    resouceUrl: "",
    description: "",
    title: "",
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
        title: uploadData.title,
        grade: values1
      }),
    });
    setLoading(false);
    if (!req.ok) {
      return toast({
        title: "Something went wrong.",
        description:
          "We can't receive the resources at the moment . Please try again.",
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
  console.log("THe selected type : ", values1);
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
                    ? types_.find((typo) => typo.value === value)?.label
                    : "Select Type  ..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search Type..." />
                  <CommandEmpty>No Type found.</CommandEmpty>
                  <CommandGroup>
                    {types_.map((typo) => (
                      <CommandItem
                        key={typo.value}
                        value={typo.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === typo.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {typo.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Grade Level
            </Label>
            <Popover open={open2} onOpenChange={setOpen2}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open2}
                  className="w-[200px] justify-between"
                >
                  {values1}
                  {/* {values1
                    ? grades.find((g) => g.value === values1)?.label
                    : "Select Grade  ..."} */}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search Type..." />
                  <CommandEmpty>No Grade found.</CommandEmpty>
                  <CommandGroup>
                    {grades.map((grade) => (
                      <CommandItem
                        key={grade.value}
                        value={grade.value}
                        onSelect={(currentValue) => {
                          setValues1(currentValue === values1 ? "" : currentValue);
                          setOpen2(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            values1 === grade.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {grade.label}
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
