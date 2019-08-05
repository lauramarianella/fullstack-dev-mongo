import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const buttonStyles = css`
  padding: 5px 10px;
  border-radius: var(--border-radius-s);
  cursor: pointer;
  border: 1.5px solid var(--bg-tertiary-color); /* border: none; */
  color: var(--font-tertiary-color);
  font-size: 0.8rem;
  letter-spacing: 2px;
  background: var(--bg-tertiary-color);
  outline: none;
  text-decoration: none;

  width: 100%;
  &:hover {
    background: transparent;
    color: var(--font-tertiary-contrast-color);
  }
  &:hover {
    background: var(--bg-hover-tertiary-color);
    color: var(--font-tertiary-color);
  }

  box-shadow: 2px 2px var(--shadow-color);
  margin-bottom: 20px;
`;

export const Button = styled.button`
  ${buttonStyles}
`;

export const ButtonLink = styled(Link)`
  ${buttonStyles}
`;
