export default function Footer() {
  return (
    <>
      <div className="footer flex justify-center py-[50px] bg-gradient-to-r from-black/[0.93] via-gray-700 to-gray-700/[0.79] text-white">
        <div className="footerContainer w-[1400px] flex flex-col justify-center items-center gap-7">
          <div className="footerWrapper w-full grid grid-cols-3">
            <div className="contactInfo ">
              <div className="flex flex-col items-center gap-5">
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl  font-medium">Contact Us</h1>
                  <hr className="w-[85%] self-center bg-gray-400" />
                </div>
                <ul className="flex flex-col items-center  font-normal text-xl gap-2">
                  <li>
                    Email: <span>example@gmail.com</span>
                  </li>
                  <li>
                    Phone: <span>+91 12345 67890</span>
                  </li>
                  <li>
                    Address: <span>CSMT Mumbai, India</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="quickLinks">
              <div className="flex flex-col items-center gap-5">
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl  font-medium">Quick Links</h1>
                  <hr className="w-[85%] self-center" />
                </div>
                <ul className="flex flex-col items-center  font-normal text-xl gap-2">
                  <li className=" cursor-pointer hover:text-gray-400">Home</li>
                  <li className=" cursor-pointer hover:text-gray-400">About</li>
                  <li className=" cursor-pointer hover:text-gray-400">
                    Services
                  </li>
                  <li className=" cursor-pointer hover:text-gray-400">
                    Products
                  </li>
                  <li className=" cursor-pointer hover:text-gray-400">
                    Contact
                  </li>
                </ul>
              </div>
            </div>
            <div className="followInfo ">
              <div className="flex flex-col items-center gap-5">
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl  font-medium">Follow Us</h1>
                  <hr className="w-[85%] self-center bg-gray-400" />
                </div>
                <div className="socialLinks flex gap-3 text-[40px]">
                  <i className="fa-brands fa-square-instagram cursor-pointer hover:text-gray-400"></i>
                  <i className="fa-brands fa-square-facebook cursor-pointer hover:text-gray-400"></i>
                  <i className="fa-brands fa-square-x-twitter cursor-pointer hover:text-gray-400"></i>
                  <i className="fa-brands fa-linkedin cursor-pointer hover:text-gray-400"></i>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-solid border-1 w-[90%] border-gray-400" />
          <div className="copyRight h-12 w-full flex justify-center items-center">
            <p className=" text-gray-300 text-md">
              Copyright &copy; 2024. Designed by SUJAL
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
