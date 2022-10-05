import React, {useState} from 'react';
import {NavLink, Route, Switch} from 'react-router-dom';
import NavBar from './NavBar';

export default function Header( { currentUser, onSignOut, className } ) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return(
    <header className={`header ${currentUser.loggedIn && className}`}>
      <div className="header__logo"></div>

      <Switch>
        <Route exact path="/">
          <NavBar className={`header__navbar_type_main ${isMenuOpen && 'header__navbar_active'}`}>
            <div>{currentUser.email}</div>
            <div onClick={onSignOut} className="header__navbar-link">Выйти</div>
          </NavBar>
          <div
            onClick={handleClick}
            className={`header__navbar-menu ${isMenuOpen && 'header__navbar-menu_active'}`}
          ><span></span></div>
        </Route>
        <Route path="/sign-up">
          <NavBar>
            <NavLink to="/sign-in" className="header__navbar-link">Войти</NavLink>
          </NavBar>
        </Route>
        <Route path="/sign-in">
          <NavBar>
            <NavLink to="/sign-up" className="header__navbar-link">Регистрация</NavLink>
          </NavBar>
        </Route>
      </Switch>
    </header>
  )
}