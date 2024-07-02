// import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { SpaceCarousel } from "./SpaceCarousel";

export default function HeadBanner () {

  return (
    <div className="flex flex-col sm:flex-row justify-between">
      <div className="py-10">
        <div className="text-2xl font-medium sm:text-4xl flex flex-col gap-2">
          <div>Earn points and Reputation with Ischia</div>
          <div>by you favorite Quest.</div>
        </div>
        <div></div>
        <div className="py-10 flex flex-col sm:flex-row gap-10">
          <Link href={'/quest/create'} className="btn">
          Create a Quest
          </Link>

          {/* <Link href={'/'} className=" btn btn-outline">
            Explore Existing
          </Link> */}
        </div>

      </div>
      <div className="py-10 flex justify-center items-center">
        <SpaceCarousel />
      </div>
    </div>
  )
}