import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const runtime = "edge";

export default function Home() {
  return (
    <>
      <div className="w-full from-slate-700 to-slate-800 bg-gradient-to-r flex items-center">
        <div className="container text-center mx-auto max-h-fit py-20">
          <h1 className="text-5xl lg:text-8xl md:text-5xl  text-zinc-200 font-extrabold mx-auto">
            Retain <span className="underline">Healthy</span> <br /> volunteers
          </h1>
          <p className="text-2xl dark:text-gray-400">
            Find insights in serving trends and take action using your planning
            center data
          </p>
          <Link href="/dashboard">
            <Button size={"lg"} className="mt-8">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <div className="py-8 container">
        <div className="lg:flex items-center">
          <div className="p-8 max-w-screen-sm">
            <Image
              src={"/TeamPage.jpg"}
              alt="Team View"
              width={800}
              height={1200}
              className="border-4 border-zinc-900 rounded-md"
            ></Image>
          </div>
          <div className="text-center lg:text-left max-w-lg">
            <h2 className="text-2xl xl:text-5xl font-medium">
              Quickly uncover serving trends of your volunteers
            </h2>
            <p className="mx-auto lg:mx-0 text-lg xl:text-2xl max-w-lg pt-2 text-zinc-400">
              Use your planning center account to quickly uncover serving trends
              across all positions and volunteers
            </p>
          </div>
        </div>
      </div>
      <div className="bg-slate-800">
        <div className="py-8 container">
          <div className="lg:flex items-center">
            <div className="text-center lg:text-left max-w-lg">
              <h2 className="text-2xl xl:text-5xl font-medium">
                Ensure you are caring for your volunteers
              </h2>
              <p className="mx-auto lg:mx-0 text-lg xl:text-2xl max-w-lg pt-2 text-zinc-400">
                Easily understand how often your volunteers are serving and in
                which areas they are most commonly serving
              </p>
            </div>
            <div className="p-8 max-w-screen-sm">
              <Image
                src={"/PersonPage.jpg"}
                alt="Person View"
                width={800}
                height={1200}
                className="border-4 border-zinc-900 rounded-md"
              ></Image>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-8 text-center">
        <h2 className="text-xl font-medium text-zinc-400">
          How are your teams doing?
        </h2>
        <h2 className="text-2xl xl:text-4xl font-semibold">
          Check in on your team health for free
        </h2>
        <div className="py-8">
          <Link href={"/dashboard"}>
            <Button size={"lg"} className="text-xl">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
