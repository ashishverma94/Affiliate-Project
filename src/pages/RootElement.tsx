import { FC } from "react";
import { Link, Outlet } from "react-router-dom";

const RootElement : FC = () => {
  return (
    <div>
      <div className="bg-[orange] flex items-center justify-center p-6 h-[80px]">
        <div className=" flex items-center w-full h-[50px]">
          <div></div>
          <div className="">
            <Link to={"/"}>
              <div className=" w-[120px] py-2 px-3 rounded-md font-[500] text-[12px] bg-[#b5afaf] ">
                Go to home Page
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default RootElement;
