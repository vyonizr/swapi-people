import React from 'react'

export const Store = React.createContext();

const initialState = {
  loading: true,
  people: {},
  page: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_FIRST_PAGE':
      return action.payload
    case 'FETCH_NEXT_PAGE':
      return action.payload
    case 'FETCH_PREVIOUS_PAGE':
      return action.payload
    default:
      return state;
  }
}

export const StoreProvider = props => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={ value }>{ props.children }</Store.Provider>
}