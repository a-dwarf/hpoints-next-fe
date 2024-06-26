
export default function ReputationHeader() {
  return (
    <div className=" flex flex-col gap-4 sm:flex-row justify-between items-center">
      <div className=" sm:max-w-xl">
        <div className=" card-title my-6">
          Reputation:
        </div>
        <div className=" card card-body card-bordered">
          {"In a blockchain-based reputation system, higher reputation scores unlock greater rewards. Users can enhance their scores by integrating with platforms like GitHub, participating in community X activities, and engaging in on-chain transactions."}
        </div>
      </div>
      <div>
        <div className=" card card-bordered w-40 h-40 flex flex-col items-center justify-center">
          <div className=" font-bold text-4xl">{"Score"}</div>
          <div className=" font-semibold text-4xl">{"98"}</div>
        </div>
        <div className=" font-semibold text-2xl mt-2">{"My Reputation"}</div>
      </div>
    </div>
  );
}
