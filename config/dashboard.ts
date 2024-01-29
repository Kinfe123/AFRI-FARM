// import { DashboardConfig } from "types"

export const dashboardConfig: any = {
  mainNav: [
    // {
    //   title: "Documentation",
    //   href: "/docs",
    // },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    // {
    //   title: "Talents",
    //   href: "/dashboard",
    //   icon: "post",
    // },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
    {
      title: "Schedule",
      href: "/dashboard/schedule",
      icon: "timer",
    },
    {
      title: "Progress",
      href: "/dashboard/progress",
      icon: "chart",
    },
    {
      title: "Manage User Account",
      href: "/dashboard/account",
      icon: "user",
    },
    {
      title: "AI Insights",
      href: "/dashboard/ai-insights",
      icon: "ai",
    },
  ],
}

