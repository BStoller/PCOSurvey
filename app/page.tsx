import { Button } from "@/components/ui/button";
import Link from "next/link";

export const runtime = "edge";

export default function Home() {
  return (
    <div className="w-full h-full from-zinc-800 to-slate-800 bg-gradient-to-r">
      <div className="text-center mx-auto pt-16">
        <h1 className="text-3xl md:text-5xl  text-zinc-200 font-extrabold">
          Retain <span className="underline">Healthy</span> volunteers
        </h1>
        <p className="text-2xl dark:text-gray-400">
          Find insights in serving trends and take action
        </p>
        <Link href="/dashboard">
          <Button size={"lg"} className="mt-8">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
