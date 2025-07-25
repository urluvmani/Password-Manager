import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className='bg-slate-900 text-white fixed top-0 w-[100vw]  h-12 flex justify-around item-center'>
        <div className="logo flex items-center"><h1 className='text-2xl font-bold'> <span className='text-2xl font-bold text-green-700'> &lt;</span>Pass<span className='text-2xl font-bold text-green-700'>OP/&gt;</span></h1></div>
        <div className="list flex items-center">
            <Link href={"https://github.com/urluvmani"} target='_blank' >
            <ul className='flex gap-2 bg-green-700 px-2 font-semibold hover:font-bold rounded-md hover:bg-green-600 items-center '>
            <Image width={30} height={30} src="/git.png" alt="" />
            GitHub
            </ul>
            </Link>
        </div>
    </nav>
  )
}

export default Navbar
