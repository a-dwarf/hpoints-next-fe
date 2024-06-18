// import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { SpaceCarousel } from "./SpaceCarousel";

export default function HeadBanner () {

  return (
    <div className="flex flex-col sm:flex-row justify-between">
      <div className="py-10">
        <div className="text-2xl font-medium sm:text-4xl flex flex-col gap-2">
          <div>Earn rewards</div>
          <div>by Contributing to Your</div>
          <div>Favorite Space on Hetu Ischia</div>
        </div>
        <div></div>
        <div className="py-10 flex gap-10">
          <Link href={'/project/space'} className="btn">
            Create Your Space
          </Link>

          <Link href={'/'} className=" btn btn-outline">
            Explore Existing
          </Link>
        </div>

      </div>
      <div className="py-10">
        <SpaceCarousel />
      </div>
    </div>
  )
}