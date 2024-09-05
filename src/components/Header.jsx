import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Header() {
    const [ search, setSearch ] = useState('');
    const navigate = useNavigate();
    const handleSearch = async (e) => {
        e.preventDefault();
        navigate(`/result/${search}`);
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
    }
    // max-md:justify-end max-md:pr-[10px]
    return (
        <header className='flex justify-center items-center w-full h-[60px] border-b border-gray-700 relative max-[550px]:justify-end max-[550px]:pr-[10px]'>
            <Link to='/' onClick={() => setSearch('')}>
                <div className='flex justify-center items-center absolute inset-y-2/4 left-[10px]'>
                    <img src='/favicon.png' alt="bread icon" className='w-[22px] mr-[10px]' />
                    <span className='text-white font-bold text-xl'>Gomtube</span>
                </div>
            </Link>
            {/* max-w-[350px] max-md:w-[calc(100%-150px)] max-[530px]:hidden */}
            <form className='flex h-[35px] w-[300px] max-[700px]:w-[calc(100%-400px)] max-[550px]:w-[150px] max-[350px]:w-[calc(100%-200px)] max-[350px]:hidden' onSubmit={handleSearch}>
                <input className='bg-black pl-[10px] w-full font-medium focus:outline-none text-white' onChange={handleChange} type='text' placeholder='검색' value={search} />
                <button className='min-w-[35px] w-[35px] h-full bg-zinc-600 flex justify-center items-center p-[6px] hover:brightness-95'>
                    <img src='/search.png' alt='search icon' className='invert hover:brightness-95' />
                </button>
            </form>
        </header>
    );
}
