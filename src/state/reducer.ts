import theme from "./theme/reducer";
import swap from "./swap/reducer";
import lists from "./lists/reducer";
import multicall from "./multicall/reducer";
import user from "./user/reducer";
import transactions from "./transactions/reducer";
import chains from "./chains/reducer";
import presale from "./presale/reducer";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  swap,
  lists,
  multicall,
  user,
  transactions,
  chains,
  presale, 
  theme,
});
export default reducer;
