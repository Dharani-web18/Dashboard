import React from "react";
import { FaSearch } from "react-icons/fa"; // Importing the search icon from react-icons

const Search = ({ search, setSearch }) => {
    return (
        <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
            <div className='searchContainer'>
                <FaSearch className='searchIcon' />
                <input
                    id='search'
                    type='text'
                    role='searchbox'
                    placeholder='Search anything..'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}   
                />
            </div>
        </form>
    );
};

export default Search;
