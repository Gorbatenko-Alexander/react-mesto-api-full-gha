import React from 'react';
import logo from "../images/logo.svg";
import {useNavigate} from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo"/>
      <p className="header__text header__text_email">{props.email}</p>
      <a className="header__text header__text_darker" href='/sign-in'
         onClick={(evt) => {evt.preventDefault(); navigate('/sign-in'); props.onLogout();}}>Выйти</a>
    </header>
  );
}

export default Header;
