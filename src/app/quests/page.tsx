import QuestsHeader from "@/components/quests/QuestsHeader";
import QuestsList from "@/components/quests/QuestsList";
import Image from "next/image";

export default function QuestsPage() {
  return (
    <div className="pt-40 relative">
      <img className=" absolute w-96 left-0 top-[400px]" src="/images/quest/questBg1.png" />

      <img className=" absolute w-96 right-0 top-[800px]" src="/images/quest/questBg2.png" />
      <div className="absolute right-0 top-0 overflow-hidden w-[400px] h-96">
        <img
          className=" absolute w-[400px] -right-[100px] -top-[60px]"
          src="/images/quest/questBg3.png"
        />
      </div>
      <div className="max-w-5xl relative z-10 mx-auto">
        <div className='max-w-5xl w-full flex flex-col px-2 sm:px-0'>
          <QuestsHeader />
        </div>
        <div className=" border-t border-solid border-[#323232] mt-20"></div>
        <div className='max-w-5xl w-full flex flex-col px-2 sm:px-0'>
          <QuestsList />
        </div>
      </div>
    </div>
  );
}
