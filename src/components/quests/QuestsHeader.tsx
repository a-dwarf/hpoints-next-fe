
export default function QuestsHeader() {
  return (
    <div className=" flex flex-col gap-4 sm:flex-row justify-between sm:items-start items-center">
      <div className=" sm:max-w-xl">
        <div className=" text-white text-3xl font-bold my-6">
        What is Quest？
        </div>
        <div className=" text-base text-[#A9A9A9]">
          {"Quest is ischia's event. quest is created by the project side and offers generous prizes such as USDT and points. Users can earn money by participating in Quest, and the project side can also gain user growth. The more quests you participate in, the more rewards you get. Come and participate! Start your ischia journey"}
        </div>
      </div>
      <div>
        <div className="w-80 h-80 flex flex-col items-center justify-center">
          <div className=" font-bold text-4xl">
            <img className="w-80 h-80 " src="/images/quest/cover.png" />
          </div>
        </div>
      </div>
    </div>
  );
}
