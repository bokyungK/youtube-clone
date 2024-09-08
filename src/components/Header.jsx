import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

export default function Header() {
    const { search: pastSearch } = useParams();
    const [ search, setSearch ] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        if (search) navigate(`/result/${search}`);
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        setSearch(pastSearch || '');
    }, [pastSearch])

    return (
        <header className='flex justify-end items-center w-full h-[60px] border-b border-gray-700 relative pr-[10px] xs:justify-center xs:pr-0'>
            <Link to='/' className='flex justify-center items-center absolute inset-y-2/4 left-[10px]'>
                <img src='/favicon.png' alt="bread icon" className='w-[22px] mr-[10px]' />
                <span className='text-white font-bold text-xl'>Gomtube</span>
            </Link>
            <form className='hidden h-[35px] w-[300px] 2xs:flex 2xs:w-[calc(100%-200px)] xs:w-[calc(100%-400px)] 3md:w-[300px]' onSubmit={handleSearch}>
                <input className='bg-black pl-[10px] w-full font-medium focus:outline-none text-white' onChange={handleChange} type='text' placeholder='검색' value={search} />
                <button className='min-w-[35px] w-[35px] h-full bg-zinc-600 flex justify-center items-center p-[6px] hover:brightness-95'>
                    <img src='/search.png' alt='search icon' className='invert hover:brightness-95' />
                </button>
            </form>
        </header>
    );
}
