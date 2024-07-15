import { TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Footer() {
  return (
    <div className='w-full mt-20'
    style={{
      boxShadow: '0px 2px 100px 0px rgba(50,243,169,0.22)',
    }}
    >
      <div className='max-w-5xl w-full mx-auto flex py-7 relative z-10'>
        <div>
          <Link className="" href="/">
            <img className="w-52" src="/images/header/headerIcon.png"/>
          </Link>
          <div className=" my-8">
            <div className=" w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <TwitterLogoIcon className=" h-5 w-5 text-black" />
            </div>
          </div>
        </div>
        <div className=" ml-20">
          <div className=" flex flex-col mt-10">
            <div className=" text-white font-semibold text-xl">IsChia</div>
            <div className=" text-[#A9A9A9] text-base mt-6">
              Doc
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
