import { ChevronDown, Search, ShoppingCart, User, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setOnPage } from "@/features/onPageCategorySlice.js";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { auth } from "../firebase/config.js";
import { signOut } from "firebase/auth";
import { ModeToggle } from "@/components/ui/mode-toggle.jsx";
import { userNotExist } from "@/features/userSlice.js";
import { useLogoutMutation } from "@/services/userApi.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Categories from "./Categories.jsx";
import SuggestionsList from "./SuggestionsList.jsx";
import { useDebounce } from "@/Hooks/useDebounce.jsx";
import { useNavigate } from "react-router-dom";

export default function Navbar2({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const onPage = useSelector((state) => state.onPageCategory.onPage);
  const location = useLocation();

  const [fullInput, setFullInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePageChange = (page) => {
    dispatch(setOnPage(page));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const FetchSuggestions = async (search) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/v1/products/all?search=${search}`
      );
      if (!response.ok) {
        return new Error("Network response was not OK");
      }
      const result = await response.json();
      return result.products;
    } catch (error) {
      setError("Failed to fetch suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedInputValue = useDebounce(inputValue, 300);

  const fetchSuggestions = async () => {
    if (debouncedInputValue.length > 1) {
      const newSuggestions = await FetchSuggestions(debouncedInputValue);
      if (newSuggestions) {
        setSuggestions(newSuggestions);
      }
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (debouncedInputValue.length > 1) {
      fetchSuggestions(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [debouncedInputValue]);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : dataKey);
    onSelect(suggestion);
    setSuggestions([]);
  };

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      await logout(user._id);
      dispatch(userNotExist());
      localStorage.removeItem("currentUser");
      toast.success("Sign Out Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Sign Out Fail");
    }
  };

  return (
    <>
      <div className="navbar flex flex-col items-center">
        <div className="navbarContainer w-[1400px] flex items-center justify-between gap-4">
          <div className="logo$cat flex gap-20 items-center">
            <Link to="/" onClick={() => handlePageChange("")}>
              <h1 className="text-3xl font-bold py-7">FashionEra</h1>
            </Link>
            <Categories />
          </div>
          <div className="tabs&search flex w-full items-center justify-between mx-20 ">
            <ul
              className={`tabs transition-all duration-300 ease-linear flex gap-8 text-xl font-medium ${
                fullInput ? "flex-[0] hidden" : "flex-[.7]"
              }`}
            >
              <Link to="/mens" onClick={() => handlePageChange("mens")}>
                <li
                  className={`tab transition-all duration-200 ease-linear hover:text-2xl ${
                    onPage === "mens"
                      ? "border-b-[3px] border-slate-600 border-solid"
                      : ""
                  }`}
                >
                  Mens
                </li>
              </Link>
              <Link to="/womens" onClick={() => handlePageChange("womens")}>
                <li
                  className={`tab transition-all duration-200 ease-linear hover:text-2xl ${
                    onPage === "womens"
                      ? "border-b-[3px] border-slate-600 border-solid"
                      : ""
                  }`}
                >
                  Womens
                </li>
              </Link>
              <Link to="/kids" onClick={() => handlePageChange("kids")}>
                <li
                  className={`tab transition-all duration-200 ease-linear hover:text-2xl ${
                    onPage === "kids"
                      ? "border-b-[3px] border-slate-600 border-solid"
                      : ""
                  }`}
                >
                  Kids
                </li>
              </Link>
            </ul>

            <div
              className={`px-3 py-2 relative transition-all delay-300 duration-300 ease-linear searchInput flex-col ${
                fullInput ? "flex-1" : "flex-[.3]"
              } border-solid border cursor-pointer border-slate-500 rounded-full `}
            >
              <div className="flex w-full">
                <input
                  type="text"
                  value={inputValue}
                  onClick={() => setFullInput(true)}
                  className="w-full outline-none bg-inherit"
                  placeholder="Search Product"
                  onChange={handleInputChange}
                />

                {fullInput ? (
                  <div className="flex items-center gap-3">
                    <X className="size-7" onClick={() => setFullInput(false)} />

                    <Button
                      onClick={() => {
                        navigate("/products", {
                          replace: true,
                          state: { inputValue },
                        });
                        setFullInput(false);
                      }}
                      className="text-base p-5 rounded-full"
                    >
                      Search
                    </Button>
                  </div>
                ) : (
                  <Search className="size-7" />
                )}
              </div>
              {fullInput ? (
                <SuggestionsList
                  class="absolute z-30 w-[80%] top-[55px] rounded-lg border border-solid bg-white"
                  dataKey={"title"}
                  highlight={inputValue}
                  suggestions={suggestions}
                  onSuggestionClick={handleSuggestionClick}
                  error={error}
                  loading={loading}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="personals relative flex gap-12">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0">
                    <div className="flex items-center">
                      <User className="size-8" />
                      <ChevronDown />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuLabel>
                    Hey,&nbsp;&nbsp;{user.name.split(" ")[0]}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Wishlist</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="loginBtnSignUp">
                {location.pathname === "/login" ? (
                  <Link to="/register">
                    <Button className="text-lg">SignUp</Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button className="text-lg">Login</Button>
                  </Link>
                )}
              </div>
            )}
            <div className="cart flex">
              <Link className="peer" to="/cart">
                <ShoppingCart className="size-8 " />
              </Link>
              <div className="tooltip peer-hover:visible invisible text-sm transition-all ease-in-out py-1 px-1 rounded-xl absolute -bottom-12 self-center">
                Cart
              </div>
            </div>
            <ModeToggle />
          </div>
        </div>
        {location.pathname !== "/" &&
          location.pathname !== "/mens" &&
          location.pathname !== "/womens" &&
          location.pathname !== "/kids" &&
          location.pathname !== "/login" &&
          !location.pathname.includes("admin") &&
          location.pathname !== "/register" && (
            <hr
              className={`navbarHr border-[0.5px] rounded-lg border-slate-400 w-[1400px] justify-self-center`}
            />
          )}
      </div>
    </>
  );
}
