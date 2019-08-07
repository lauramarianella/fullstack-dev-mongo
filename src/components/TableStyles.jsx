import styled, { css } from 'styled-components';

export const Table = styled.table`
  padding: 10px 0px 0px 50px;
  margin: 0; /* margin: auto; */
  width: 600px;
  border-collapse: collapse;
  /* border: 1px solid #fff; */
  /* border-style: hidden; */
`;

export const Caption = styled.caption`
  background-color: var(--bg-tertiary-color);
  color: #fff;
  font-size: x-large;
  font-weight: bold;
  letter-spacing: 0.3em;
`;

export const thTdStyles = css`
  padding: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: var(--border-color) #ccc;
`;
export const Th = styled.th`
  ${thTdStyles}
`;
export const TdCenter = styled.td`
  text-align: center;
  ${thTdStyles}
`;
export const TdRight = styled.td`
  text-align: right;
  ${thTdStyles}
`;
export const TdLeft = styled.td`
  text-align: left;
  ${thTdStyles}
`;
export const TrEven = styled.tr`
  color: var(--font-tertiary-color);
  background-color: var(--bg-hover-tertiary-color);
`;

export const TFoot = styled.tfoot`
  /* font-weight: bold;
  font-size: large; */
  font-size: 1rem;
  background-color: lightgray;
  color: #000;
  border: 2px solid #000;
  /* text-align: right; */
`;
