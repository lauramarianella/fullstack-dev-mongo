import { createStore } from 'redux';

let reducer = (state, action) => {
  if (action.type === 'LOGIN-SUCCESS') {
    return { ...state, loggedIn: true };
  }
  if (action.type === 'LOGOUT-SUCCESS') {
    return { ...state, loggedIn: false };
  }

  if (action.type === 'SET-LIST-ITEMS') {
    return {
      ...state,
      listItems: action.listItems,
      componentToShow: 'items',
    };
  }
  if (action.type === 'SET-ITEM-DETAILS') {
    return {
      ...state,
      itemDetails: action.itemDetails,
      componentToShow: 'itemDetails',
    };
  }
  if (action.type === 'SHOW_COMPONENT') {
    return {
      ...state,
      componentToShow: action.componentToShow,
    };
  }

  if (action.type === 'PAYMENT') {
    return {
      ...state,
      order: action.order,
      componentToShow: 'checkoutForm',
    };
  }

  if (action.type === 'SET_ID_FROM_COMBO') {
    console.log('Store.js ' + [action.name] + ' ' + [action.value]);
    return {
      ...state,
      [action.name]: action.value,
    };
  }

  return state;
};

let initialState = {
  loggedIn: false,
  componentToShow: 'items',
  listItems: [],
  itemDetails: { item: {}, dresser: {}, dresserServices: [] },
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
