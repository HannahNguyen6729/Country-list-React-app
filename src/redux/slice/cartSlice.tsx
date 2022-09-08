import { createSlice } from "@reduxjs/toolkit";
import { CountryState, Country } from "../../interface/interface";

const initialState: CountryState = {
  countriesList: [],
  flag: false,
  favoriteCountryList: [],
  flagList: [],
};
export const cartSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    removeFlagAction: (state, action) => {
      const index = state.flagList.findIndex(
        (item) => item.name == action.payload.country.name
      );
      if (index !== -1) {
        //found it
        if (state.flagList[index].quantity > 1) {
          state.flagList[index].quantity += action.payload.quantity;
        } else {
          state.flagList.splice(index, 1);
        }
      } else {
        //cannot find it
        if (action.payload.quantity < 0) {
          return;
        }
      }
    },
    addFlagAction: (state, action) => {
      const index = state.flagList.findIndex(
        (item) => item.name == action.payload.country.name
      );
      if (index !== -1) {
        //found it
        state.flagList[index].quantity += action.payload.quantity;
      } else {
        //cannot find it
        const newCountry = { ...action.payload.country, quantity: 1 };
        state.flagList = [...state.flagList, newCountry];
      }
    },
  },
});
// Action creators are generated for each case reducer function
export const { addFlagAction, removeFlagAction } = cartSlice.actions;
//reducer = all countrySlice
export default cartSlice.reducer;
