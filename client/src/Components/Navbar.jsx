import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setOnPage } from "@/features/onPageCategorySlice.js";

export default function Navbar() {
  const dispatch = useDispatch();
  const onPage = useSelector((state) => state.onPageCategory.onPage);
  const [mobMenu, setMobMenu] = useState(false);

  const toggleSidebar = () => {
    setMobMenu(!mobMenu);
  };

  const handlePageChange = (page) => {
    dispatch(setOnPage(page));
  };

  return (
    <>
      <nav className="relative">
        <div className=" navbar w-[100vw] bg-gradient-to-r from-black/[0.93] via-gray-700 to-gray-700/[0.79] flex justify-center z-10">
          <div className="flex justify-between items-center w-[1400px] text-white">
            <div className="logo max-[1430px]:ml-8">
              <h1 className="text-2xl font-bold py-6">
                <Link to="/" onClick={() => handlePageChange("")}>
                  FashionEra
                </Link>
              </h1>
            </div>
            <div className="menu-items text-white max-[640px]:hidden">
              <ul className=" flex space-x-6 md:space-x-10 text-lg">
                <li
                  className={`transition ease-linear delay-50 hover:scale-[1.10] cursor-pointer py-5 ${
                    onPage === "mens"
                      ? "border-b-[3px] border-white border-solid"
                      : ""
                  }`}
                >
                  <Link to="/mens" onClick={() => handlePageChange("mens")}>
                    Mens
                  </Link>
                </li>
                <li
                  className={`transition ease-linear delay-50 hover:scale-[1.10] cursor-pointer py-5 ${
                    onPage === "womens"
                      ? "border-b-[3px] border-white border-solid"
                      : ""
                  }`}
                >
                  <Link to="/womens" onClick={() => handlePageChange("womens")}>
                    Womens
                  </Link>
                </li>
                <li
                  className={`transition ease-linear delay-50 hover:scale-[1.10] cursor-pointer py-5 ${
                    onPage === "kids"
                      ? "border-b-[3px] border-white border-solid"
                      : ""
                  }`}
                >
                  <Link to="/kids" onClick={() => handlePageChange("kids")}>
                    Kids
                  </Link>
                </li>
                <li
                  className={`transition ease-linear delay-50 hover:scale-[1.10] cursor-pointer py-5 ${
                    onPage === "newreleases"
                      ? "border-b-[3px] border-white border-solid"
                      : ""
                  }`}
                >
                  <Link
                    to="/newreleases"
                    onClick={() => handlePageChange("newreleases")}
                  >
                    New Releases
                  </Link>
                </li>
              </ul>
            </div>
            <div className="max-[1430px]:mr-8">
              <div className="login-btn bg-gradient-to-r from-white to-gray-500 rounded-[25px] border border-solid border-white transition ease-linear delay-50 hover:scale-105 max-[640px]:hidden">
                <div className="text-black cursor-pointer text-xl px-4 py-2 ">
                  <Link to="/login" onClick={() => handlePageChange("")}>
                    Login
                  </Link>
                </div>
              </div>
              <svg
                onClick={toggleSidebar}
                className="hidden max-[640px]:block text-white hover:scale-125 transition ease-linear delay-50 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="white"
              >
                <path d="M120-240v-80h520v80H120Zm664-40L584-480l200-200 56 56-144 144 144 144-56 56ZM120-440v-80h400v80H120Zm0-200v-80h520v80H120Z" />
              </svg>
            </div>
          </div>
        </div>
        <div
          className={`mob-menu border border-solid border-gray-500 h-screen block flex-col items-center absolute top-0 ${
            mobMenu
              ? "right-0 w-[350px] transition-right duration-500 homeBanner"
              : "-right-[350px] w-[350px] transition-left duration-500"
          }`}
        >
          <div className="bg-black w-full flex items-center justify-between px-6 py-8 mb-6">
            <h1 className="text-white text-2xl font-medium">Menu</h1>
            <svg
              className="cursor-pointer"
              onClick={toggleSidebar}
              xmlns="http://www.w3.org/2000/svg"
              height="28px"
              viewBox="0 -960 960 960"
              width="28px"
              fill="white"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </div>
          <div className="w-full">
            <ul className="flex flex-col space-y-6 justify-start ml-12 text-[19px] font-normal">
              <li className="transition ease-linear delay-50 hover:scale-105 cursor-pointer">
                <Link to="/mens">Mens</Link>
              </li>
              <li className="transition ease-linear delay-50 hover:scale-105 cursor-pointer">
                <Link to="/womens">Womens</Link>
              </li>
              <li className="transition ease-linear delay-50 hover:scale-105 cursor-pointer">
                <Link to="/kids">Kids</Link>
              </li>
              <li className="transition ease-linear delay-50 hover:scale-105 cursor-pointer">
                <Link to="/newreleases">New Releases</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
