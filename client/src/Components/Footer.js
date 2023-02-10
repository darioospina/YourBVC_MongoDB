// React Hooks
import React from 'react'

// React icons
import {RiLogoutBoxFill} from 'react-icons/ri'
import {FaUser} from 'react-icons/fa'
import {AiOutlineAppstoreAdd} from 'react-icons/ai';
import {BsBook} from 'react-icons/bs';



const Footer = () => {

    return (
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', fontSize: "14px"}}>
        Copyright © 2023 Dario Ospina | Powered by&nbsp;<a href="http://dario-ospina.com" target={"_blank"}>Dario Ospina</a>
      </div>
    )
}

export default Footer;