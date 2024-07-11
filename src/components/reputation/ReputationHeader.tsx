import useSWRImmutable from "swr/immutable";

export default function ReputationHeader() {
  const {data, isLoading, error } = useSWRImmutable(`/api/reputations`);

  return (
    <div className=" flex flex-col gap-4 sm:flex-row justify-between items-center">
      <div className=" sm:max-w-xl">
        <div className=" text-white text-3xl font-bold my-6">
          Reputation:
        </div>
        <div className=" text-base text-[#A9A9A9]">
          {"In a blockchain-based reputation system, higher reputation scores unlock greater rewards. Users can enhance their scores by integrating with platforms like GitHub, participating in community X activities, and engaging in on-chain transactions."}
        </div>
      </div>
      <div className=" flex flex-col items-center mr-20">
        <div className=" w-40 h-40 flex flex-col items-center justify-center">
          <div className=" text-9xl font-extrabold"
          style={{
            background: 'linear-gradient(93.69201727794098deg, #2ED197 0%, #5AEAB7 100%)',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          >{data?.finalScore}</div>
        </div>
        <div className=" font-semibold text-4xl mt-2 text-white">{"Reputation"}</div>
      </div>
    </div>
  );
}
