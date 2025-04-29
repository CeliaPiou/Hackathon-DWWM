import { useState, useRef } from 'react'
import React from 'react'
import '../index.css'
import { CiMenuBurger } from "react-icons/ci";
import Apropos from '../Apropos';


function Header() {

const [isOpen, setIsOpen] = useState(false);

// Gérer l'ouverture du 'A propos'
  const [about, setAbout] = useState(false);

  const handleApropos = () => {
    setAbout(!about)
    console.log(about)
  };

    return (
    <>
      <Apropos about={about} setAbout={setAbout}/>

      <nav className='mb-10'>
          <div className='h-16 items-center flex justify-between'>
              {/* Logo */}
            <div className='text-3x1 text-white font-bold px-4'>
              CAMYNI
            </div>
              {/* buttons desktop */}

            <div className='hidden sm:block'>
              <button onClick={handleApropos} className='text-gray-100 text-lg px-4'> À PROPOS</button>
              <a href=''className='text-gray-100 text-lg px-4'> CONTACTER</a>
            </div>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className='block sm:hidden px-4 text-3xl text-white'>
          <CiMenuBurger />
          </button>
              {/* buttons mobile */}
          <div className={`${
            isOpen ? "block" : "hidden"
            } block sm:hidden bg-gray-100 space-y-2 pb-3`}>
              <a href='' className='text-gray-600 text-lg px-4 block'> À PROPOS</a>
              <a href=''className='text-gray-600 text-lg px-4 block'> DETECTION</a>
              <a href=''className='text-gray-600 text-lg px-4 block'> CONTACTER</a>
            </div>
      </nav>
      </>
    )
}

export default Header;


