import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  color: var(--font-primary-color);
  background: var(--bg-primary-color);
  border-bottom: 15px solid var(--bg-secondary-color);
  box-shadow: 2px 2px var(--shadow-color);
  letter-spacing: 5px;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
`;

const Logo = styled.div`
  color: var(--font-primary-color);
  margin: 0;
  padding-left: 15px;
  font-family: cursive;
  font-style: oblique;
  font-size: 1.6rem;
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.1rem;
`;

const NavLink = styled(Link)`
  color: var(--font-primary-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  padding-right: 15px;
  &:hover {
    color: var(--font-hover-primary-color);
  }
`;

let Navbar = (props) => {
  let navLinksContent = <NavLink to="/login">LOGIN</NavLink>;
  if (props.loggedIn) {
    navLinksContent = <NavLink to="/logout">LOGOUT</NavLink>;
  }
  return (
    <Wrapper>
      <LogoLink to="/">
        <Logo>ALLURE</Logo>
      </LogoLink>
      <NavLinks>
        <NavLink to="/">HOME</NavLink>
        {navLinksContent}
      </NavLinks>
    </Wrapper>
  );
};

let mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn };
};

export default connect(mapStateToProps)(Navbar);
