import QuestEdit from "@/components/quest/QuestEdit";

export default function ProjectSpacePage() {
  return (
    <div className="pt-40 relative">
        <img className=" absolute w-96 left-0 top-[400px]" src="/images/quest/questBg1.png" />

        <img className=" absolute w-96 right-0 top-[800px]" src="/images/quest/questBg2.png" />

      <div className="max-w-5xl w-full flex items-center flex-col px-2 sm:px-0 mx-auto">
        <div className=" max-w-3xl w-full">
          <QuestEdit />
        </div>
      </div>
    </div>
  );
}