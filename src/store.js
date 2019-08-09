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

  if (action.type === 'SET-CREATE-ITEM-FORM') {
    return {
      ...state,
      componentToShow: 'createItem',
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
