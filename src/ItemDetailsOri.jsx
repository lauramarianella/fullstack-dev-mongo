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
    this.state = {
      order: [], //{idService, idDresser, idPriceType(g,s,m,l), price}
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

  handleOnClickRadioBtn = (ev) => {
    alert(ev.target.name);
    alert(ev.target.value);
  };
  handleOnClickCheckBox = (ev) => {
    // this.setState({ [ev.target.name]: ev.target.value });
    console.log('idDresser ', this.props.itemDetails.dresser.id);
    console.log('ev.target.name ', ev.target.name);
    console.log('ev.target.value ', ev.target.value);
    alert('radBtn-' + ev.target.value);
    // let radBtn = document.getElementByName('radBtn-' + ev.target.value);
    // alert(radBtn.value);
    let newOrder = this.state.order;

    let price = 20;

    if (ev.target.checked)
      newOrder.push({ idService: ev.target.value, price: price });
    else {
      let i = newOrder.find((sp, i) => {
        sp.idService === ev.target.value;
        return i;
      });
      newOrder.splice(i, 1);
    }

    let newSubTotalObj = newOrder.reduce((acc, servicePrice) => {
      return { price: acc.price + servicePrice.price };
    });

    let newTaxesArray = this.state.taxesArray.map((taxObj) => {
      taxObj.totalTax = newSubTotalObj.price * taxObj.tax;
      return taxObj;
    });

    let newTotalTaxesObj = newTaxesArray.reduce((acc, taxObj) => {
      return { totalTax: acc.totalTax + taxObj.totalTax };
    });

    this.setState({
      ...this.state,
      order: newOrder,
      subTotal: newSubTotalObj.price,
      taxesArray: newTaxesArray,
      total: newSubTotalObj.price + newTotalTaxesObj.totalTax,
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
              onClick={this.handleOnClickCheckBox}
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
                name={`radBtn-${dresserService.idService}`}
                value={dresserService.g}
                onClick={this.handleOnClickRadioBtn}
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
                name={`radBtn-${dresserService.idService}`}
                value={dresserService.s}
                onClick={this.handleOnClickRadioBtn}
              />
            </TdRight>
          );
          tds.push(
            <TdRight key={`${i}m`}>
              {dresserService.m}
              <input
                type="radio"
                name={`radBtn${dresserService.idService}`}
                value={dresserService.m}
                onClick={this.handleOnClickRadioBtn}
                defaultChecked
              />
            </TdRight>
          );
          tds.push(
            <TdRight key={`${i}l`}>
              {dresserService.l}
              <input
                type="radio"
                name={`radBtn${dresserService.idService}`}
                value={dresserService.l}
                onClick={this.handleOnClickRadioBtn}
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
