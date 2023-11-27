'use client'
import React from 'react';
import useSWR from 'swr';
import './searchbar.scss';
import { searchResults } from '@/services/navigation/types';
import { transformTitleUrl } from '@/services/utils';


const fetcher = (url: string) => fetch(url).then((res) => {
  const json = res.json();
  console.log("json: ", json);
  return json;
})


export const Searchbar = () => {

  //use search term to set data that's fetched through SWR
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const { data }: { data: searchResults[] } = useSWR(searchTerm ? `http://${process.env.NEXT_PUBLIC_WP_DOMAIN}/wp-json/wp/v2/search?subtype="post"&search=${searchTerm}` : null, fetcher);

  // create search result links
  const mapSearchResults = () => {
    return data ? data.map((search, index) => {
      return (<a key={index} href={transformTitleUrl(search.title)}>{search.title}</a>)
    })
      : <></>
  }

  //set logic for updating search term
  const handleInputChange = (event: any) => {
    let value = event.target.value;

    if (value && value.length > 3)
      setSearchTerm(event.target.value);

    if (value < 3)
      setSearchTerm("");
  };

  return (
    <>
      <div className='searchbar-container'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input onChange={handleInputChange} className={"searchbar"} type="text" placeholder="search list/game" />
        <div className={data ? "searchbar-dropdown content-visible" : "searchbar-dropdown"}>
          {mapSearchResults()}
        </div>

      </div>
    </>
  );
};
