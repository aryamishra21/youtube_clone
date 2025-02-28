import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { FaMicrophone } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { flipSideBar } from "../utils/sideBarSlice";
import { Link, useLocation } from "react-router-dom";
import { SearchURL, Video_URL } from "../utils/constants";
import { resetVideos, setVideos } from "../utils/homePageSlice";
import { addSearchQuery, addSearchSugg } from "../utils/searchBarSlice";
import store from "../utils/Store";
const Header = () => {
  const dispatch = useDispatch();
  const searchSuggData=useSelector(store=>store.searchBar.sugg);
  const dropdownRef = useRef(null);
  const location = useLocation();
  // console.log(searchSuggData,'fromslice')
  const [searchText,setSearchText]=useState('')   
  const [showSugg,setShowSugg]=useState(false)   
  const [searchSugg,setSearchSugg]=useState([])
  useEffect(()=>{
    const timer=setTimeout(() => {
    if(searchSuggData[searchText]){
      setSearchSugg(searchSuggData[searchText])
      // console.log('not called',searchSuggData[searchText])
    }
    else{
        getSuggestions();
        // console.log('called')
      }
    }, 200);
    return()=>{
      clearTimeout(timer)
    }
  },[searchText])
  useEffect (()=>{
    const handleClickOutside=(event)=>{
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setShowSugg(false)
      }
    }
    document.addEventListener('mousedown',handleClickOutside);

    return()=>{
      document.removeEventListener('mousedown',handleClickOutside);
      
    }
  },[location.pathname])
  const getSuggestions=async()=>{
    if(searchText){
      const response=await fetch(SearchURL+searchText)
      const json=await response.json()
      setSearchSugg(json[1])
      dispatch(addSearchSugg({[searchText]:json[1]}))
    }
    // console.log(json,'sugg')
  }
  const handleSideBarView = () => {
    dispatch(flipSideBar());
  };
  const setData = async () => {
    dispatch(resetVideos())
    const response = await fetch(Video_URL);
    const json = await response.json();
    // console.log(json[1], "data");
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
      <div className="w-[38rem] flex items-center lg:ml-[15rem] relative">
        <input
          type="text"
          placeholder="Search"
          className="w-[90%] border-[1px] px-4 py-[0.5rem]  rounded-l-full border-gray-400 focus:outline-blue-600 focus:outline-[0.2px] placeholder:font-semibold"
          onChange={(e)=>{
            setSearchText(e.target.value)
          setShowSugg(true)}}
          value={searchText}
        />
        <div className="rounded-r-full border-[1px]  p-[0.5rem] bg-gray-100 border-gray-400 cursor-pointer">
          <IoSearchOutline className="size-[1.5rem] mx-2 p-[1px] " />
        </div>
        {showSugg && 
        <div ref={dropdownRef} className="border-2 absolute top-[100%] w-[90%] bg-white rounded-lg">
          {searchSugg?.map((sug)=>{
            return(
              <Link className="flex gap-4 p-2 items-center hover:bg-gray-200 cursor-pointer" to={`/results?search_query=${sug.replace(/ /g, '+')}`} onClick={()=>{
                setShowSugg(false)
                setSearchText(sug)
                dispatch(addSearchQuery(sug))
                }} >
                <RxCounterClockwiseClock/>
                <p>{sug}</p>
              </Link>
            )
          })}
        </div>}
      </div>
    </div>
  );
};

export default Header;

