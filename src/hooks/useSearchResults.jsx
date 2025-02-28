import React, { useEffect, useState } from 'react'
import { SearchResultsURL } from '../utils/constants';
const useSearchResults = (props) => {
  const format=props?.replace(' ','%20')
  console.log(props,'props',format)
    const[searchData,setSearchData]=useState(null);
    useEffect(()=>{
      getData()
    },[props])
    const getData=async()=>{
      const response=await fetch(SearchResultsURL+'&q=' +format)
      const json=await response?.json();
      // console.log('json',json)
      setSearchData(json?.items);
      // console.log(searchData)
    } 
  return searchData
}

export default useSearchResults


///fix video views 