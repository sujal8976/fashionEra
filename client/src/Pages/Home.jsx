import Categories from "../Components/Home Components/Categories.jsx";
import FeaturedProducts from "../Components/Home Components/FeaturedProducts.jsx";
import HomeBanner from "../Components/Home Components/Home.Banner.jsx";
import HomeBrands from "../Components/Home Components/Home.Brands.jsx";
import Offers from "../Components/Home Components/Offers.jsx";

export default function Home() {
  return (
    <>
      <div className="home">
        <HomeBanner />
        <HomeBrands />
        <FeaturedProducts />
        <Categories />
        <Offers />
      </div>
    </>
  );
}
