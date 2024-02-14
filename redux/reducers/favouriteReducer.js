const initialState = {
    favouriteItems: [],
  };
  
  const favouriteReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_FAVOURITE':
        return {
          ...state,
          favouriteItems: [...state.favouriteItems, action.payload],
        };
        case 'REMOVE_FAVOURITE':
          return {
            ...state,
            favouriteItems: state.favouriteItems.filter(productId => productId !== action.payload),
          };
      default:
        return state;
    }
  };
  
  export default favouriteReducer;
  