import DashboardActivity from "@/components/dashboard/DashboardActivity";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QuestsHeader from "@/components/quests/QuestsHeader";
import QuestsList from "@/components/quests/QuestsList";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-between">
      <div className='max-w-5xl w-full flex flex-col px-2 sm:px-0'>
        <DashboardHeader />
      </div>
      <div className='max-w-5xl w-full flex flex-col px-2 sm:px-0'>
        <DashboardActivity />
      </div>
    </div>
  );
}
