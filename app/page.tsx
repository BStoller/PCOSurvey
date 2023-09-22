import { Button } from "@/components/ui/button";
import Link from "next/link";

export const runtime = "edge";

export default function Home() {
  return (
    <div className="w-fulls from-slate-700 to-slate-800 bg-gradient-to-r flex items-center">
      <div className="container text-center mx-auto max-h-fit py-20">
        <h1 className="text-5xl lg:text-8xl md:text-5xl  text-zinc-200 font-extrabold mx-auto">
          Retain <span className="underline">Healthy</span> <br/> volunteers
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
