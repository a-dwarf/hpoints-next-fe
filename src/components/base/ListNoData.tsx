import NoData from "./NoData";

export default function ListNoData() {
  return (
    <div className=" flex flex-col items-center justify-center my-6">
      <div className=" w-80 h-40">
        <NoData />
      </div>
      <div className=" text-white text-xs mt-6 max-w-96 text-center">
        {
          "No Data"
        }
      </div>
    </div>
  );
}
