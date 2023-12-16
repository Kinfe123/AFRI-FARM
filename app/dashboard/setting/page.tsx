import { redirect } from "next/navigation"

import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/ui/shell"
import { UserNameForm } from "@/components/user-input-form"
import { getUser } from "@/lib/curruser"
export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {

  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserNameForm user={{ id: parseInt(user.id), name: user.username || "" }} />
      </div>
    </DashboardShell>
  )
}