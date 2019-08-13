import styled from 'styled-components';

export const FiltersWrapper = styled.div`
  width: 250px;
  padding: 30px 20px;
`;

export const FilterWrapper = styled.div`
  padding: 15px 0px;
  border-top: 1px solid #999999;
`;

export const FilterWrapperDobleCol = styled.div`
  display: flex; /*grid;*/
  /* grid-template-columns: auto auto; */
  align-items: center;
  justify-content: space-between;
`;

export const FilterTitle = styled.div`
  font-size: 28px;
  font-family: Genath-Regular, serif;
  line-height: 1.2em;
  letter-spacing: 2px;
  padding-bottom: 15px;
`;

export const FilterSummaryLabel = styled.div`
  font-family: EngraversGothic BT, sans-serif;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 2px;
  line-height: 18px;
  color: #999999;
`;

export const FilterSubWrapperPrice = styled.div`
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  padding-right: 10px;
`;

export const FilterInputPrice = styled.input`
  font-family: Genath-Regular, serif;
  font-size: 14px;
  letter-spacing: 0;
  width: 100%;
  /* line-height: 30px; */
  /* padding: 5px 10px; */
  margin: 0;
  border: 1px solid var(--border-color); /*#dddddd*/
`;

export const FilterSelect = styled.select`
  font-family: Genath-Regular, serif;
  font-size: 16px;
  /* line-height: 50px; */
  background: transparent;
  letter-spacing: 0;
  width: 100%;
  height: 28px;
  border: 1px solid var(--border-color); /*#dddddd*/
`;
