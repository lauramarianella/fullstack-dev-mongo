import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Search from './Search.jsx';

import styled from 'styled-components';
const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
`;
const MiddleBar = styled.div`
  height: 10px;
  background: var(--bg-secondary-color);
  border-bottom: 2px solid var(--border-color);
  box-shadow: 2px 2px var(--shadow-color);
`;
const StatusBar = styled.div`
  height: 50px;
  background: #fff;
`;

const WrapperNavBar = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr auto auto;
  align-items: center;
  color: var(--font-primary-color);
  background: var(--bg-primary-color);
  padding: 0px 30px 0px 30px;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  letter-spacing: 10px;
  /* &:hover {
    opacity: 0.5;
  } */
`;

const Logo = styled.div`
  color: var(--font-primary-color);
  margin: 0;
  padding-left: 15px;
  /* font-family: cursive; */
  font-weight: bold;
  font-style: oblique;
  font-size: 1.6rem;
`;
const LogoImg = styled.img`
  width: 90px;
  height: 60px;
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.1rem;
  letter-spacing: 2px;
  /* &:hover {
    opacity: 0.5;
  } */
`;

const NavLink = styled(Link)`
  color: var(--font-primary-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 50px;
  padding: 20px;
  &:hover {
    background: var(--bg-hover-primary-color);
    border: 1px 1px 1px 1px var(--shadow-color);
    color: var(--font-hover-primary-color);
  }
`;

let Navbar = (props) => {
  let navLinksContent = <NavLink to="/login">LOGIN</NavLink>;
  if (props.loggedIn) {
    navLinksContent = (
      <>
        <NavLink to="/item/new">NEW</NavLink>
        <NavLink to="/logout">LOGOUT</NavLink>
      </>
    );
  }
  return (
    <Wrapper>
      <WrapperNavBar>
        <LogoLink to="/">
          <LogoImg src="/images/imgs/logo.png" />
        </LogoLink>
        <LogoLink to="/">
          <Logo>ALLURE</Logo>
        </LogoLink>
        <Search />
        <NavLinks>
          <NavLink to="/">HOME</NavLink>
          {navLinksContent}
        </NavLinks>
      </WrapperNavBar>
      <MiddleBar />
      <StatusBar />
    </Wrapper>
  );
};

let mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn };
};

export default connect(mapStateToProps)(Navbar);
