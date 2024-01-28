import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { getUser } from "@/lib/curruser";
// import { EmptyPlaceholder } from "@/components/empty-placeholder"
// import { DashboardHeader } from "@/components/header"
// import { PostCreateButton } from "@/components/post-create-button"
// import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/ui/shell";
// import Background from "@/components/grid-background/background"
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardShell>
      <h1 className="mx-auto  font-heading text-4xl text-black dark:text-white">
        More Features are popping in{" "}
      </h1>

      <div></div>
    </DashboardShell>
  );
}
