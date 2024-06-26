
export default function QuestsHeader() {
  return (
    <div className=" flex flex-col gap-4 sm:flex-row justify-between items-center">
      <div className=" sm:max-w-xl">
        <div className=" card-title my-6">
        What is Quest？
        </div>
        <div className="">
          {"Quest is ischia's event. quest is created by the project side and offers generous prizes such as USDT and points. Users can earn money by participating in Quest, and the project side can also gain user growth. The more quests you participate in, the more rewards you get. Come and participate! Start your ischia journey"}
        </div>
      </div>
      <div>
        <div className=" card card-bordered w-40 h-40 flex flex-col items-center justify-center">
          <div className=" font-bold text-4xl">{"Score"}</div>
        </div>
      </div>
    </div>
  );
}
