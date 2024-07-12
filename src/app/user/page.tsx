import UserSpace from "@/components/UserSpace";

export default function Home() {
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
      <div className="max-w-5xl relative z-10 w-full mx-auto">
        <UserSpace />
      </div>
    </div>
  );
}
