import Link from "next/link";
import { Boxes } from "lucide-react";
import Button from "@/components/Button";

export default function Success() {
  return (
    <div className="w-screen h-screen">
      <div className="container w-full h-full grid place-items-center">
        <div className="flex flex-col items-center gap-8">
          <div className="">
            <Boxes strokeWidth={1} className="size-36" />
          </div>
          <div className="pb-8">
            <h1 className="text-6xl text-center">
              Thank you for checking <br /> out deCube!
            </h1>
          </div>

          <Button as={Link} href={"/"}>
            BACK TO HOME
          </Button>
        </div>
      </div>
    </div>
  );
}
