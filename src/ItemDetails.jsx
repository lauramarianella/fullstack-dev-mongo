import React from 'react';
import { connect } from 'react-redux';

function ItemDetails(props) {
  //console.log(props.propsItemDetails.item);
  if (!props.itemDetails.item.description) return '';

  return (
    <>
      <div>{props.itemDetails.item.description}</div>
      <p>${props.itemDetails.item.cost}</p>
      <img
        src={`${props.itemDetails.item.imgSrc}`}
        height="200px"
        width="200px"
      />
      <div>by {props.itemDetails.dresser.name}</div>
      <div>
        <form>
          <table style={{ border: '5px  rgb(223, 191, 15) solid' }}>
            <caption>{props.itemDetails.dresser.name}'rates</caption>
            <thead>
              <tr>
                <th>Select</th>
                <th>Service</th>
                <th>$-unique</th>
                <th>$-short</th>
                <th>$-medium</th>
                <th>$-long</th>
              </tr>
            </thead>
            <tbody>
              {props.itemDetails.dresserServices.map((dresserService, i) => (
                <tr key={i}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{dresserService.service.service}</td>
                  <td>
                    {dresserService.g}
                    <input
                      type="radio"
                      name={`${dresserService.idDresser}${
                        dresserService.idService
                      }`}
                      value="medium"
                    />
                  </td>
                  <td>
                    {dresserService.s}
                    <input
                      type="radio"
                      name={`${dresserService.idDresser}${
                        dresserService.idService
                      }`}
                      value="medium"
                    />
                  </td>
                  <td>
                    {dresserService.m}
                    <input
                      type="radio"
                      name={`${dresserService.idDresser}${
                        dresserService.idService
                      }`}
                      value="medium"
                    />
                  </td>
                  <td>
                    {dresserService.l}
                    <input
                      type="radio"
                      name={`${dresserService.idDresser}${
                        dresserService.idService
                      }`}
                      value="medium"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
      <button onClick={() => handleOnClick({})}> Add to Cart</button>
    </>
  );
}

let handleOnClick = () => {
  alert('++Shopping cart');
};
let mapStateToProps = (state) => {
  return { itemDetails: state.itemDetails };
};

export default connect(mapStateToProps)(ItemDetails);
