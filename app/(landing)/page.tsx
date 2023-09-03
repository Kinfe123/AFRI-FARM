"use client";

import { useUser } from "@clerk/nextjs";
import SignInButton from "../../components/SignInButton";
import { Button } from "../../components/ui/button";
import { signIn } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import Image from "next/image";
import { HeroSection } from "@/components/hero";
import Featured from "@/components/Featured";
import Product from "@/components/Products";
import { Accordions } from "@/components/Accordion";
import Supported from "@/components/Supported";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const apiKey = process.env.GOOGLE_CLIENT_ID;

export default function Home() {
  const user = useUser();
  
  return (
    <NextUIProvider>
      <main className=" min-h-screen  grid place-items-center space-y-10 md:space-y-20 p-16">
        {/* hellow */}
        <HeroSection />
        {/* <Products /> */}
        {/* <Product /> */}
        <Featured />

        <Accordions />
        <Supported />
      </main>
      <div className="m-10">
        <Footer />
      </div>
    </NextUIProvider>
  );
}
