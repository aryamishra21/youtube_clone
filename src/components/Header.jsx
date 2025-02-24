import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { FaMicrophone } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { flipSideBar } from "../utils/sideBarSlice";
import { Link } from "react-router-dom";
import { Video_URL } from "../utils/constants";
import { setVideos } from "../utils/homePageSlice";
const Header = () => {
  const dispatch = useDispatch();
  const handleSideBarView = () => {
    dispatch(flipSideBar());
  };
  const setData = async () => {
    const response = await fetch(Video_URL);
    const json = await response.json();
    console.log(json, "data");
    dispatch(setVideos(json?.items));
  };
  return (
    <div className="shadow-md py-3 flex">
      <div className="w-[10rem] flex items-center mx-2">
        <LuMenu
          className="size-[2.5rem] cursor-pointer rounded-full hover:bg-gray-200 p-2"
          onClick={handleSideBarView}
        />
        <Link to={"/"}>
          <img
            className="w-[6rem] h-[1.3rem] ml-2 cursor-pointer"
            alt="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1024px-YouTube_Logo_2017.svg.png"
            onClick={() => {
              setData();
            }}
          />
        </Link>
      </div>
      <div className="w-[38rem] flex items-center lg:ml-[15rem]">
        <input
          type="text"
          placeholder="Search"
          className="w-[90%] border-[1px] px-4 py-[0.5rem]  rounded-l-full border-gray-400 focus:outline-blue-600 focus:outline-[0.2px] placeholder:font-semibold"
        />
        <div className="rounded-r-full border-[1px]  p-[0.5rem] bg-gray-100 border-gray-400 cursor-pointer">
          <IoSearchOutline className="size-[1.5rem] mx-2 p-[1px] " />
        </div>
      </div>
    </div>
  );
};

export default Header;

// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=10&key=AIzaSyCLKgH7l7uz8-SEPzMBNjQpfXHyw81oENI
