import { Typography } from "@/components/design/typographyPattern";

export const runtime = "edge";

export default function Home() {
  return (
    <div className="flex h-full from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 bg-gradient-to-r">
      <div className="lg:py-20 py-8 lg:px-80 px-4 font-light">
        <h1 className="tracking-tight text-4xl text-zinc-200">
          Keep your volunteers
        </h1>
        <h2 className="text-4xl dark:text-gray-400">Don&apos;t replace them</h2>
      </div>
      <div className=" h-full w-1 ">
        <Typography></Typography>
      </div>
    </div>
  );
}
