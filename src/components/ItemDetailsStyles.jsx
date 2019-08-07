import styled, { css } from 'styled-components';
import { mediaSizes } from '../globals';

export const DetailsWrapperDobleCol = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: start;
  justify-content: start;
  margin: auto;
`;

export const ImgLarge = styled.img`
  margin: 0;
  padding: 5px 0px 0px 0px;
  height: 250px;
  width: 350px;
`;

export const PCss = css`
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
export const P = styled.p`
  ${PCss}
`;
export const PDresser = styled.p`
  ${PCss}
  font-weight: bold;
  letter-spacing: 2px;
  padding-bottom: 10px;
`;
export const WrapperBtn = styled.div`
  padding-top: 30px;
  width: 150px;
  margin: auto;
`;
