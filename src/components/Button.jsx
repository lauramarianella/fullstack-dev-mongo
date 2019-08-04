import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const buttonStyles = css`
  padding: 5px 10px;
  border-radius: var(--border-radius-s);
  cursor: pointer;
  border: none;
  color: var(--font-tertiary-color);
  font-size: 1rem;
  background: var(--bg-tertiary-color);
  outline: none;
  text-decoration: none;

  width: 100%;
  &:hover {
    background: var(--bg-hover-tertiary-color);
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
