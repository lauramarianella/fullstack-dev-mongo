import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const buttonStyles = css`
  padding: 5px 10px;
  border-radius: var(--border-radius-s);
  cursor: pointer;
  border: 1.5px solid var(--border-color); /* border: none; */
  color: var(--btn-font-color);
  font-size: 0.8rem;
  letter-spacing: 2px;
  background: var(--btn-color);
  outline: none;

  text-decoration: none;

  width: 100%;
  &:hover {
    background: var(--btn-hover-color);
    color: var(--btn-font-hover-color);
    box-shadow: 1px 1px #888888;
  }

  box-shadow: 3px 3px #888888;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  ${buttonStyles}
`;

export const ButtonLink = styled(Link)`
  ${buttonStyles}
`;
