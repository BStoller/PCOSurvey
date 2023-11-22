import { Input } from "@/components/ui/input";

export default function Loading() {
  return (
    <>
      <h1 className="pt-8">Select A Team To Analyze</h1>
      <div className="py-2">
        <Input placeholder="Search" className="md:max-w-sm"></Input>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {new Array(10).fill(0).map((x) => (
          <div
            key={x}
            className="rounded-md h-20 bg-gray-200 animate-pulse"
          ></div>
        ))}
      </div>
    </>
  );
}
