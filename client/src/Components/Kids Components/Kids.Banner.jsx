export default function KidsBanner() {
  return (
    <>
      <div className="kidsBanner flex justify-center">
        <div className="left flex-[0.6] w-[840px] kidsPageBanner">
          <div className="imgContainer flex justify-center">
            <img
              className="h-[560px]"
              src="/images/kids-banner-model.png"
              alt=""
            />
          </div>
        </div>
        <div className="right flex-[0.4] flex flex-col w-[560px]">
          <div className="relative flex justify-center flex-[0.35] bg-[#d8d3d3] shadow-md">
            <p className="absolute bottom-10 text-3xl font-semibold">
              Classic Fits
            </p>
          </div>
          <div className="relative flex-[0.3] flex justify-center text-lg items-center font-medium bg-[#aeb2b9]">
            <img
              className=" h-44 w-52"
              src="/images/superdry_logo.png"
              alt=""
            />
            <img className=" h-44 w-52" src="/images/ketch_logo.png" alt="" />
            <p className="absolute pl-6 bottom-5">&amp; more</p>
          </div>
          <div className="flex-[0.35] flex flex-col gap-3 justify-center items-center bg-[#d8d3d3] shadow-md">
            <p className="text-5xl font-bold">
              MIN. 40% OFF<sup>*</sup>
            </p>
            <div className="shopButton cursor-pointer hover:scale-105 bg-black text-white rounded-full transition-all delay-[.2s] ease-linear">
              <p className="py-2 text-lg font-medium px-4">SHOP</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
