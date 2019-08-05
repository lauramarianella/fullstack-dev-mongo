import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const WrapperSign = styled.div`
  width: 500px;
  height: 330px;
  border: 2px solid var(--border-color);
  background: var(--bg-content-light-color);
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  padding: 30px 100px;
`;

export const HeaderSign = styled.div`
  margin: 0;
  padding: 0 0 30px;
  text-align: center;
  font-size: 1.3rem;
`;

export const TitleSign = styled.p`
  margin: 0;
`;
export const InputSign = styled.input`
  width: 100%;
  margin-bottom: 20px;
  border: 1.5px solid rgb(233, 231, 231);
  background: transparent;
  outline: none;
  height: 30px;
  font-size: 0.9rem; /*16px*/
`;

export const LinkSign = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  color: var(--links-color);
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

export const DivError = styled.div`
  font-size: 0.8rem;
  color: red;
`;
