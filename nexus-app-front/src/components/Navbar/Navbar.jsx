import React from 'react'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import Icon from '../Icon/Icon'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="nav-bar">
      <div className="group-2">
      <div className='text-wrapper-2'>NexusOn</div>
    </div>
    <div className="group">
        <div className="text-wrapper active">Home</div>
        <div className="text-wrapper">Dashboard</div>
        <div className="text-wrapper">Blog</div>
        <div className="text-wrapper">Stream</div>
    </div>

    <div className="group-3">
      <div className='icon'><Icon icon={faMagnifyingGlass} css='' /></div>
      <div className='icon'><Icon icon={faHeart} css='' /></div>
      <div className='icon'><Icon icon={faBell} css='' /></div>
      <div className='icon'><Icon icon={faUser} css=''/></div>
    </div>
</div>
  )
}

export default Navbar
