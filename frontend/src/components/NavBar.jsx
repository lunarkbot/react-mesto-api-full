import React from 'react';

function NavBar(props) {
  return (
    <nav className={`header__navbar ${props.className}`}>
      {props.children}
    </nav>
  );
}

export default NavBar;