import React from 'react'
import { NavLink } from 'react-router-dom';
import {BsCardList, BsFillBrushFill, BsInfoCircle} from 'react-icons/bs'
import './navbar.css'
const Navbar = () => {
  const activeLink = 'nav__activelink';
  const normalLink = 'nav__link'
  return (
    <div className='navbar__container'>
      <div className='navbar'>
        <div className='navbar__item'>
          <NavLink to="/" className={({isActive})=>isActive ? activeLink : normalLink}>
            <BsCardList fontSize="20"/>
            <p>Main</p>
          </NavLink>
        </div>
        <div className='navbar__item'>
          <NavLink to="/form" className={({isActive})=>isActive ? activeLink : normalLink}>
            <BsFillBrushFill fontSize="20"/>
            <p>Form</p>
          </NavLink>
        </div>
        <div className='navbar__item'>
          <NavLink to="/about" className={({isActive})=>isActive ? activeLink : normalLink}>
            <BsInfoCircle fontSize="20"/>
            <p>About</p>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar