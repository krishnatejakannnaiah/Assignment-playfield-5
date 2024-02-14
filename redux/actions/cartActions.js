// redux/actions/cartActions.js
export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: product,
  });
  
  export const removeFromCart = (productId) => ({
    type: 'REMOVE_FROM_CART',
    payload: productId,
  });
  

  export const addToFavourite = (productId) => ({
    type: 'ADD_TO_FAVOURITE',
    payload: productId,
  });

  export const removeFavourite = (productId) => ({
    type: 'REMOVE_FAVOURITE',
    payload: productId,
  });