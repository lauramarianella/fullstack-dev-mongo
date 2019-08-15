import styled from 'styled-components';
import { mediaSizes } from '../globals';

export const CardWrapper = styled.div`
  overflow: hidden;
  box-shadow: 0px 2px 4px 0px #ddd;
  margin: 20px;
  border-radius: var(--border-radius-m);
  /* Things I changed */
  width: 160px;
  height: 320px;
`;

export const Card = styled.div`
  box-shadow: 0px 2px 4px 0px #ddd;
  border-radius: var(--border-radius-m);
  width: 100%;
  height: 93%;
`;

export const CardTitle = styled.h1`
  margin: 0;
  padding: 10px;
  background: var(--bg-tertiary-color);
  color: var(--font-tertiary-color);
  font-size: 0.9rem;
  letter-spacing: 1.2px;
  text-align: center;
  height: 17%;
  text-transform: uppercase;
  @media (min-width: ${mediaSizes.sm}) {
    font-size: 1rem;
  }
`;

export const ImgSmall = styled.img`
  padding: 5px 0px 0px 0px;
  width: 100%;
  height: 50%;
`;

export const CardDescription = styled.p`
  margin: 0;
  padding: 5px 0px 0px 0px;
  background: transparent;
  color: var(--font-primary-color);
  font-size: 1rem;
  height: 20%;
  @media (min-width: ${mediaSizes.sm}) {
    font-size: 1rem;
  }
`;
export const CardPrice = styled.p`
  margin: 0;
  padding: 5px 0px 0px 0px;
  border-top: 1px solid var(--border-color);
  background: transparent;
  color: var(--font-primary-color);
  font-size: 1.2rem;
  height: 8.5%;
  text-align: center;
  @media (min-width: ${mediaSizes.sm}) {
    font-size: 1rem;
  }
`;
