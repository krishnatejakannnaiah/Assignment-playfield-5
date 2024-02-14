// cartReducer.js
const initialState = {
    cartItems: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const { id, data } = action.payload;
        const existingItemIndex = state.cartItems.findIndex((item) => item.id === id);
  
        if (existingItemIndex !== -1) {
          // If the item is already in the cart, update its count
          const updatedCartItems = [...state.cartItems];
          updatedCartItems[existingItemIndex].count += 1;
  
          return {
            ...state,
            cartItems: updatedCartItems,
          };
        } else {
          // If the item is not in the cart, add it with count 1
          return {
            ...state,
            cartItems: [...state.cartItems, { ...data, id, count: 1 }],
          };
        }
  
      case 'REMOVE_FROM_CART':
        const updatedCartItems = state.cartItems.map((item) => {
          if (item.id === action.payload && item.count > 0) {
            // If the item is in the cart and count is greater than 0, decrement the count
            return { ...item, count: item.count - 1 };
          }
          return item;
        });
  
        return {
          ...state,
          cartItems: updatedCartItems,
        };
  
      // Handle other cases as needed
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  