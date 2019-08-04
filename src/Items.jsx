import React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { Card, CardTitle, Button } from './components';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

function Items(props) {
  if (props.listItems.length <= 0) return '';
  return (
    <Wrapper>
      {props.listItems.map((item, index) => (
        <Card key={index}>
          <CardTitle>{item.description}</CardTitle>
          <img src={`${item.imgSrc}`} height="100px" width="100px" />
          <p>${item.cost}</p>
          <Button onClick={() => handleOnClick(item.id, props)}>View</Button>
        </Card>
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
