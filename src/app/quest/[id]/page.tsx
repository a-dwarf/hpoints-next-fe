import SpaceDetail from "@/components/space/SpaceDetail";

export default function Home() {
  return (
    <div className="pt-40 relative">
      <img
        className=" absolute w-96 left-0 top-[400px]"
        src="/images/quest/questBg1.png"
      />
      <div className="absolute right-0 top-0 overflow-hidden w-[400px] h-96">
        <img
          className=" absolute w-[400px] -right-[100px] -top-[60px]"
          src="/images/quest/questBg3.png"
        />
      </div>
      <div className="max-w-5xl w-full flex items-center flex-col px-2 sm:px-0 mx-auto relative z-10">
        <SpaceDetail />
      </div>
    </div>
  );
}
