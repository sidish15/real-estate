import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa"
import { useSelector } from 'react-redux'

const Header = () => {
        const { currentUser } = useSelector(state => state.user)
        const [searchTerm, setSearchTerm] = useState('')
        const navigate=useNavigate()
        const handleSubmit=(e)=>{
                e.preventDefault() //to prevent refreshing the page
                const urlParams=new URLSearchParams(window.location.search) //previous inf in url
                urlParams.set('searchTerm',searchTerm) //whatever the previous inf ...set the current one
                const seachQuery=urlParams.toString(); //as some of them may be number
                navigate(`search?${seachQuery}`)

        }
        useEffect(()=>{
         const urlParams=new URLSearchParams(location.search)
         const searchTermFromUrl=urlParams.get('searchTerm')
         if(searchTermFromUrl){
                setSearchTerm(searchTermFromUrl)
         }
        },[location.seach])
        return (
                <header>
                        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                                <Link to='/'>
                                        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                                                <span className='text-slate-500'>Aim</span>
                                                <span className='text-slate-700'>Estate</span>
                                        </h1>
                                </Link>

                                <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
                                        <input type="text" placeholder='Search...'
                                                className='bg-transparent focus:outline-none w-24 sm:w-64'
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <button>

                                                <FaSearch className='text-slate-600' />
                                        </button>
                                        {/* on clicking button ,form is gonna submit */}
                                </form>
                                <ul className='flex gap-4'>
                                        <Link to='/'>
                                                <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                                        </Link>
                                        <Link to='/about'>
                                                <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                                        </Link>
                                        <Link to='/profile'>
                                                {currentUser ? (
                                                        <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt='profile' />
                                                ) : (<li className=' sm:inline text-slate-700 hover:underline'>Sign In</li>)
                                                }
                                        </Link>

                                        <Link to='/sign-up'>
                                                <li className=' sm:inline text-slate-700 hover:underline'>Sign Up</li>
                                        </Link>

                                </ul>
                        </div>
                </header>
        )
}

export default Header
