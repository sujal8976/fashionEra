export default function Offers() {
  return (
    <>
      <div className="offers flex justify-center py-[50px]">
        <div className="offersContainer w-[1400px] flex flex-col gap-8">
          <div className="texts self-start w-full">
            <h1 className="text-black text-[34px] font-medium">
              Latest Offers
            </h1>
            <p className=" text-gray-400 text-lg ">
              Hurry up! to get exciting Discounts!!
            </p>
          </div>
          <div className="offersSections w-full self-center">
            <div className="upper w-full flex gap-10">
              <div className="offerSectionUpper1 flex-1 my-8 h-80"></div>
              <div className="offerSectionUpper2 flex-1 my-8 h-80"></div>
            </div>
            <div className="lower w-full flex gap-8">
              <div className="offerSectionLower1 h-80 mb-5 flex-[0.8]"></div>
              <div className="offerSectionLower2 h-80 mb-5 flex-[1.4]"></div>
              <div className="offerSectionLower3 h-80 mb-5 flex-[0.8]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
