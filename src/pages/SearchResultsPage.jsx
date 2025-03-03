import React from 'react'
import useSearchResults from '../hooks/useSearchResults'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SearchResultCard from '../components/SearchResultCard'

const SearchResultsPage = () => {
    const sideBarView=useSelector(store=>store.sideBar.isMenuOpen)
  // const [searchParams]=useSearchParams()
  const searchQuery=useSelector(state=>state.searchBar.query)
  // const data=useSearchResults(searchParams.get('search_query'))
  const data=useSearchResults(searchQuery)
  
  if(data==null) return (<h1>Not Found</h1>);
  return (
    <div className={' w-[100%] mt-10 '+(sideBarView?'xl:ml-[18%]':'')}>
      {data.map((data)=>{
        return(
          <Link to={"/watch?v="+data.id.videoId}>
          <SearchResultCard info={data} key={data.id.videoId}/>
          </Link>
        )
      })}
    </div>
  )
}

export default SearchResultsPage