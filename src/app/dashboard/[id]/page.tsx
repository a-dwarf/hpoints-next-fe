import DashboardActivity from "@/components/dashboard/DashboardActivity";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QuestsHeader from "@/components/quests/QuestsHeader";
import QuestsList from "@/components/quests/QuestsList";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="pt-40 relative">
    <img
        className=" absolute w-96 left-0 top-[400px]"
        src="/images/quest/questBg1.png"
      />
      <div className="flex flex-col items-center justify-between  relative z-10">
        <div className='max-w-5xl w-full flex flex-col px-2 sm:px-0'>
          <DashboardHeader />
          <div className=" border-t w-full border-[#323232] mt-16"></div>
        </div>
        <div className='max-w-5xl w-full flex flex-col px-2 sm:px-0'>
          <DashboardActivity />
        </div>
      </div>
    </div>
  );
}
