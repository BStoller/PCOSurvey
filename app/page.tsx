import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const runtime = "edge";

export default function Home() {
  return (
    <>
      <div className="relative w-full flex items-center">
        <Image className="absolute top-0 left-0 -z-10 opacity-[3%]" src={'/landingPageTexture.jpg'} alt="" fill={true}></Image>
        <div className="absolute top-0 left-0 h-full w-full from-blue-900 to-blue-950 bg-gradient-to-br -z-20"></div>
        <div className="container text-center mx-auto max-h-fit py-20">
          <h1 className="text-5xl lg:text-8xl md:text-5xl  text-blue-50 font-extrabold mx-auto">
            Retain <span className="underline">Healthy</span> <br /> volunteers
          </h1>
          <p className="text-2xl text-blue-200 opacity-90 max-w-sm lg:max-w-none mx-auto">
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
      <div className="pt-4 container">
        <div className="flex flex-col-reverse lg:flex-row items-center">
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
            <h2 className="text-2xl xl:text-5xl font-medium tracking-tight text-gray-800">
              Quickly uncover serving trends of your volunteers
            </h2>
            <p className="mx-auto lg:mx-0 text-lg xl:text-2xl max-w-lg pt-2 text-blue-900 opacity-80">
              Use your planning center account to quickly uncover serving trends
              across all positions and volunteers
            </p>
          </div>
        </div>
      </div>
      <div className="relative overflow-visible">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="text-center lg:text-left max-w-lg relative overflow-visible">
              <h2 className="text-2xl xl:text-5xl font-medium tracking-tight text-gray-800">
                Ensure you are caring for your volunteers
              </h2>
              <p className="mx-auto lg:mx-0 text-lg xl:text-2xl max-w-lg pt-2 text-blue-900">
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
