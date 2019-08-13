import React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import {
  CardWrapper,
  Card,
  CardTitle,
  ImgSmall,
  CardDescription,
  CardPrice,
  Button,
} from './components';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-flow: row wrap;
`;

function Items(props) {
  if (props.listItems.length <= 0) return '';

  return (
    <Wrapper>
      {props.listItems.map((item, index) => (
        <CardWrapper key={`${index}wrp`}>
          <Card key={index}>
            <CardTitle>{item.title}</CardTitle>
            <ImgSmall src={`${item.imgSrc}`} />
            <CardDescription>{item.description.substr(0, 45)}</CardDescription>
            <CardPrice>${item.cost}</CardPrice>
            <Button onClick={() => handleOnClick(item.id, props)}>View</Button>
          </Card>
        </CardWrapper>
      ))}
    </Wrapper>
  );
}

let handleOnClick = async (itemId, props) => {
  let formData = new FormData();
  formData.append('itemId', itemId);
  let response = await fetch('/item/details', {
    method: 'POST',
    body: formData,
    credentials: 'same-origin',
  });
  let responseBody = await response.text();
  let body = JSON.parse(responseBody);
  if (!body.success) {
    alert("Details don't found");
    return;
  }
  //console.log('body.itemDetails ', body.itemDetails);
  props.dispatch({
    type: 'SET-ITEM-DETAILS',
    itemDetails: body.itemDetails,
  });
};

let mapStateToProps = (state) => {
  return { listItems: state.listItems };
};

export default connect(mapStateToProps)(Items);
