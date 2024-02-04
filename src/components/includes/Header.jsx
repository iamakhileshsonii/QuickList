import React from 'react'

const Header = () => {
  return (
    <header class="bg-gradient-to-r from-black to-red flex justify-evenly p-5">
        <div className='w-1/2 md:w-1/5'>
            <h2 className='text-white font-bold text-2xl'>QuickList</h2>
        </div>

        <div className='w-1/2 md:w-4/5'>
            <h2>QuickList</h2>
        </div>
    </header>
  )
}

export default Header