export default function HomeBanner() {
  return (
    <>
      <div className="flex justify-center">
        <div className="homeBanner flex justify-center w-[95%] rounded-xl">
          <div className="bannerContainer bg-banner-gradient flex space-x-2 w-[1350px] justify-between max-[1460px]:mx-[35px] max-[1034px]:mr-0 max-[764px]:flex-col max-[500px]:mx-0 max-[415px]:ml-[10px]">
            <div className="left flex flex-col justify-center items-start gap-1 max-[764px]:py-20 max-[500px]:w-[450px] max-[500px]:self-end max-[500px]:ml-[35px] max-[450px]:py-10 max-[415px]:w-[400px] max-[425px]:self-center max-[420px]:w-[380px] max-[415px]:ml-[10px] max-[400px]:w-[300px] max-[485px]:overflow-hidden">
              <h2 className=" text-2xl font-medium text-gray-700">
                Trade-in-offer
              </h2>
              <h1 className="text-6xl font-semibold textGradient2 max-[1355px]:text-5xl max-[1242px]:text-4xl max-[415px]:text-3xl">
                Super value deals
              </h1>
              <h1 className="textGradient text-7xl font-semibold max-[1355px]:text-6xl max-[1272px]:text-5xl max-[415px]:text-4xl">
                On all products
              </h1>

              <p className="text-xl text-gray-900 max-[922px]:text-lg">
                Save more with coupons & upto 70% off <span>!</span>
              </p>
              <div className="shopButton ml-12 border-[0.5px] border-white border-solid rounded-md mt-6 transition-all delay-[0.2s] hover:border-transparent max-[485px]:self-center">
                <button className="px-4 py-2 cursor-pointer font-normal text-medium transition-all rounded-md delay-[0.2s] hover:bg-gray-800 text-white">
                  Shop Now
                </button>
              </div>
            </div>
            <div className="right flex gap-0 max-[1034px]:w-[500px] max-[898px]:justify-end max-[764px]:self-end max-[550px]:justify-self-start">
              <img
                className="w-[700px] h-[575px] object-cover max-[1128px]:w-[600px] max-[1128px]:h-[500px] max-[898px]:w-[450px] max-[420px]:h-[400px] max-[420px]:w-[350px]"
                src="/images/banner-women-model.png"
                alt=""
              />
              <div className=" w-12 h-full bg-black self-end max-[898px]:hidden max-[764px]:block"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
