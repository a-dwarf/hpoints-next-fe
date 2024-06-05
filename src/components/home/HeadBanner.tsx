// import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function HeadBanner () {

  return (
    <div className="flex flex-col sm:flex-row justify-between">
      <div className=" py-10">
        <div>
          <div>Earn Point</div>
          <div>by Contributing to Your</div>
          <div>Favorite Chain on Hetu Point</div>
        </div>
        <div></div>
        <div className="py-10">
          <Link href={'/createSpace'} className="btn">
            Create Your Space
          </Link>
        </div>

      </div>
      <div className="py-10">
        <div className="card h-60 w-60 border flex items-center justify-center">
          {'Get Point'}
        </div>
      </div>
    </div>
  )
}