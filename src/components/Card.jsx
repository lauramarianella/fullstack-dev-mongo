import styled from 'styled-components';
import { mediaSizes } from '../globals';

export const Card = styled.div`
  overflow: hidden;
  background: #fff;
  box-shadow: 0px 2px 4px 0px #ddd;
  margin: 20px;
  border-radius: var(--border-radius-m);
  text-align: center;
  /* Things I changed */
  width: 150px;
  height: 300px;
`;

export const CardTitle = styled.h1`
  margin: 0;
  padding: 20px;
  /* background: #404040; */
  /* color: #fff; */
  font-size: 1rem;
  @media (min-width: ${mediaSizes.sm}) {
    font-size: 1rem;
  }
`;

export const CardBody = styled.div`
  display: grid;
  margin: 20px;
`;
