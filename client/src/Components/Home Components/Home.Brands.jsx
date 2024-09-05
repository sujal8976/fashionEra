export default function HomeBrands() {
  const brandInfo = [
    {
      name: "NIKE",
      img: "https://i.pinimg.com/736x/33/e6/3d/33e63d5adb0da6b303a83901c8e8463a.jpg",
    },
    {
      name: "GUCCI",
      img: "https://cdn.logojoy.com/wp-content/uploads/20240307100657/1971-gucci-logo-600x319.png",
    },
    {
      name: "LV",
      img: "https://assets.turbologo.com/blog/en/2020/01/19084709/louis-vuitton-primary-logo.png",
    },
    {
      name: "CHANEL",
      img: "https://media.designrush.com/inspirations/129360/conversions/_1513770087_98_chanel1-preview.jpg",
    },
    {
      name: "DIOR",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxWFwav8am1PnN5FjtsFsSZRZJ3Pq2xzTjcg&s",
    },
  ];

  return (
    <>
      <div className="homeBrands flex justify-center py-[50px]">
        <div className="brands w-[1400px] flex flex-col gap-12">
          <div className="texts self-start">
            <h1 className="text-black text-[34px] font-medium">Top Brands</h1>
            <p className=" text-gray-400 text-lg ">Most selling Brands</p>
          </div>
          <div className="brandsCardContainer w-full flex justify-between">
            {brandInfo.map((info, i) => (
              <div
                key={i}
                className="brandCard border-slate-500/25 border-[0.1px] border-solid p-2 flex flex-col gap-2 rounded-lg shadow-inner hover:shadow-xl"
              >
                <div className="brandLogo w-40">
                  <img
                    className=" h-48 object-cover w-full"
                    src={info.img}
                    alt=""
                  />
                </div>
                <div className="brandName justify-self-center self-center">
                  <h2 className="text-xl font-medium text-black">
                    {info.name}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
