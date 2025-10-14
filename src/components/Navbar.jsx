import React from 'react'
import { Bot, Sun } from "lucide-react";


const Navbar = ({ isDarkTheme, setIsDarkTheme }) => {
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <>
      <div className="nav flex items-center justify-between px-[150px] h-[90px] bg-[#070719]" style={{padding:" 0 150px"}}>
        <div className="logo flex items-center gap-[10px]">
        <Bot size={45} color={"#93C5FD"} />
        <span className='text-2xl font-bold text-[#F5F3FF] ml-2'>Codrly</span>
        </div>
        <div className="flex items-center gap-[20px]">
            <button 
              onClick={toggleTheme}
              className='cursor-pointer transition-all hover:text-[#93C5FD] text-white'
            >
              <Sun size={24} />
            </button>
        </div>
      </div>
    </>
  )
}

export default Navbar