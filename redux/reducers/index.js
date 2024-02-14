import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import favouriteReducer from './favouriteReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  favourites: favouriteReducer,
});

export default rootReducer;
