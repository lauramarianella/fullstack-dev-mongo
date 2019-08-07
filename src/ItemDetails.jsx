import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled, { css } from 'styled-components';
import { mediaSizes } from './globals';
// https://www.webucator.com/how-to/how-style-table-with-css.cfm
import {
  Button,
  WrapperBtn,
  Table,
  Caption,
  Th,
  TdCenter,
  TdRight,
  TdLeft,
  TrEven,
  TFoot,
  CardTitle,
  DetailsWrapperDobleCol,
  ImgLarge,
  P,
  PDresser,
} from './components';

const Wrapper = styled.div`
  overflow: hidden;
  box-shadow: 0px 2px 4px 0px #ddd;
  margin: 20px;
  border-radius: var(--border-radius-s);
  width: 650px;
  /* height: 600px; */
`;

const colSpanHairLenght = 3;
const colSpanRemaining = 2; //5cols -colSpanHairLenght

class ItemDetails extends Component {
  constructor(props) {
    super(props);
    let initialOrder = this.props.itemDetails.dresserServices;
    initialOrder.forEach((o) => (o.checked = false));
    initialOrder.forEach((o) => {
      o.g ? (o.price = o.g) : (o.price = -1);
    }); //in the checking if it is -1 means they didn't choose an option in the hairlenght

    this.state = {
      order: initialOrder, //{idService, idDresser, idPriceType(g,s,m,l), price}
      subTotal: 0.0,
      taxesArray: [
        { tax: 0.05, name: 'HST', totalTax: 0.0 },
        { tax: 0.1, name: 'QST', totalTax: 0.0 },
      ],
      total: 0.0,
    };
  }

  handleOnSubmit = (ev, total) => {
    alert('++Shopping cart: ' + total);
  };

  roundOff(quantity, decimals = 2) {
    return quantity.toFixed(decimals);
  }

  handleOnClickRadioBtn = (ev, i) => {
    let newOrder = this.state.order;
    newOrder[i].price = Number(ev.target.value);
    this.setState({ ...this.state, newOrder });

    newOrder[i].checked = true;

    this.computeDetailsPayment();
  };

  handleOnClickCheckBox = (ev, i) => {
    let newOrder = this.state.order;

    ev.target.checked
      ? (newOrder[i].checked = true)
      : (newOrder[i].checked = false);

    this.setState({ ...this.state, newOrder });

    this.computeDetailsPayment();
  };

  isOrderNOTComplete() {
    let order = this.state.order;
    let orderFiltered = order.filter((o) => o.checked === true);
    let isNotOk = orderFiltered.some((o) => o.price < 0);

    document.getElementById('idDivError').innerText = isNotOk
      ? 'Please, select the price according to your hair lenght!!!'
      : '';

    return isNotOk;
  }

  computeDetailsPayment = () => {
    let order = this.state.order;

    if (this.isOrderNOTComplete()) return;

    let orderFiltered = order.filter((o) => o.checked === true);

    let subTotalObj = orderFiltered.reduce((acc, order) => {
      if (order.checked) return { price: acc.price + order.price };
    });

    let taxesArray = this.state.taxesArray.map((taxObj) => {
      taxObj.totalTax = subTotalObj.price * taxObj.tax;
      return taxObj;
    });
    // taxesArray.forEach(
    //   (tax) => (tax.totalTax = this.roundOff(tax.totalTax, 2))
    // );

    let totalTaxesObj = taxesArray.reduce((acc, taxObj) => {
      return { totalTax: acc.totalTax + taxObj.totalTax };
    });

    this.setState({
      ...this.state,
      subTotal: this.roundOff(subTotalObj.price, 2),
      taxesArray: taxesArray,
      total: this.roundOff(subTotalObj.price + totalTaxesObj.totalTax, 2),
    });
  };

  render() {
    if (!this.props.itemDetails.item.description) return '';

    let taxesTHArray = this.state.taxesArray.map((tax, i) => {
      return (
        <tr key={`${i}taxTr`}>
          <th colSpan={colSpanRemaining} key={`${i}taxTh`}>
            {tax.name} ($)
          </th>
          <th colSpan={colSpanHairLenght} key={`${i}totTax`}>
            {tax.totalTax}
          </th>
        </tr>
      );
    });

    let tableBodyArray = this.props.itemDetails.dresserServices.map(
      (dresserService, i) => {
        let tds = [];
        tds.push(
          <TdCenter key={`${i}chk`}>
            <input
              type="checkbox"
              value={dresserService.idService}
              name={`chk-${dresserService.idService}`}
              checked={this.state.order[i].checked}
              onChange={(ev) => this.handleOnClickCheckBox(ev, i)}
            />
          </TdCenter>
        );
        tds.push(
          <TdLeft key={`${i}service`}>{dresserService.service.service}</TdLeft>
        );
        if (dresserService.g) {
          tds.push(
            <TdRight colSpan={colSpanHairLenght} key={`${i}g`}>
              {dresserService.g}
              <input
                type="radio"
                name={`radBtn${i}`}
                value={this.state.order[i].g}
                onChange={(ev) => this.handleOnClickRadioBtn(ev, i)}
                defaultChecked
              />
            </TdRight>
          );
        } else {
          tds.push(
            <TdRight key={`${i}s`}>
              {dresserService.s}
              <input
                type="radio"
                name={`radBtn${i}`}
                value={this.state.order[i].s}
                onChange={(ev) => this.handleOnClickRadioBtn(ev, i)}
              />
            </TdRight>
          );
          tds.push(
            <TdRight key={`${i}m`}>
              {dresserService.m}
              <input
                type="radio"
                name={`radBtn${i}`}
                value={this.state.order[i].m}
                onChange={(ev) => this.handleOnClickRadioBtn(ev, i)}
              />
            </TdRight>
          );
          tds.push(
            <TdRight key={`${i}l`}>
              {dresserService.l}
              <input
                type="radio"
                name={`radBtn${i}`}
                value={this.state.order[i].l}
                onChange={(ev) => this.handleOnClickRadioBtn(ev, i)}
              />
            </TdRight>
          );
        }

        if (i % 2) {
          return <tr key={i}>{tds}</tr>;
        } else {
          return <TrEven key={i}>{tds}</TrEven>;
        }
      }
    );

    return (
      <Wrapper>
        <CardTitle>{this.props.itemDetails.item.title}</CardTitle>
        <DetailsWrapperDobleCol>
          <div>
            <ImgLarge src={`${this.props.itemDetails.item.imgSrc}`} />
          </div>
          <div>
            <P>${this.props.itemDetails.item.cost}</P>
            <P>{this.props.itemDetails.item.description}</P>
          </div>
        </DetailsWrapperDobleCol>

        <PDresser>@by {this.props.itemDetails.dresser.name}</PDresser>

        <div>
          <form>
            <Table>
              <Caption>{this.props.itemDetails.dresser.name}'s rates</Caption>
              <thead>
                <tr>
                  <Th colSpan={colSpanRemaining} />
                  <Th colSpan={colSpanHairLenght}>Prices by hair length</Th>
                </tr>
                <tr>
                  <Th>Select</Th>
                  <Th>Service</Th>
                  <Th>Short ($)</Th>
                  <Th>Medium ($)</Th>
                  <Th>Long ($)</Th>
                </tr>
              </thead>
              <tbody>{tableBodyArray.map((tr) => tr)}</tbody>
              <TFoot>
                <tr>
                  <th colSpan={colSpanRemaining}>SubTotal($)</th>
                  <th colSpan={colSpanHairLenght}>{this.state.subTotal}</th>
                </tr>
                {taxesTHArray.map((thTax) => thTax)}
                <tr>
                  <th colSpan={colSpanRemaining}>Total($)</th>
                  <th colSpan={colSpanHairLenght}>{this.state.total}</th>
                </tr>
              </TFoot>
            </Table>
          </form>
        </div>
        <div style={{ color: 'red' }} id="idDivError" />
        <WrapperBtn>
          <Button onClick={(ev) => this.handleOnSubmit(ev, this.state.total)}>
            Pay
          </Button>
        </WrapperBtn>
      </Wrapper>
    );
  }
}

let mapStateToProps = (state) => {
  return { itemDetails: state.itemDetails };
};

export default connect(mapStateToProps)(ItemDetails);
