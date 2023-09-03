"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Technology Integration",
    href: "/docs/primitives/alert-dialog",
    description:
      " Enhancing Education Through Technology Integration",
  },
  {
    title: "Personalized Learning:",
    href: "/docs/primitives/hover-card",
    description:
      "Empowering Learners Through Personalized Learning",
  },
  {
    title: "Online Collaboration ",
    href: "/docs/primitives/progress",
    description:
      "Facilitating Online Collaboration for Effective Learning.",
  },
  {
    title: "Gamification in Education",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Open Educational Resources",
    href: "/docs/primitives/tabs",
    description:
      "Unlocking Learning Opportunities with Open Educational Resources.",
  },
  {
    title: "Smarrt Check ",
    href: "/docs/primitives/tooltip",
    description:
      "Title: Maximizing Learning Outcomes with Blended Learning Approaches"
      
  },
];

export function NavbarMenus() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* < className="h-6 w-6" /> */}
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Beautifully Farmed
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Cultivating a deep connection with knowledge, embarking on
                      a quest for wisdom
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                How to create a docs/courses
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to effectively guidling your docs / courses
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                How to collab with others
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
