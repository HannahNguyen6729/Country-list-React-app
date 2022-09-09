import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CountryState, Country } from "../../interface/interface";

const initialState: CountryState = {
  countriesList: [],
  flag: false,
  favoriteCountryList: [],
  flagList: [],
};
export const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    searchCountryNameAction: (state, action) => {
      //console.log("search action", action);
      state.countriesList = state.countriesList.filter(
        (item) => item.name == action.payload
      );
    },
    likeAction: (state, action) => {
      state.flag = action.payload.flag;
      if (state.flag) {
        state.favoriteCountryList.push(action.payload.country);
      } else {
        const index = state.favoriteCountryList.findIndex(
          (item) => item.name === action.payload.country.name
        );
        state.favoriteCountryList.splice(index, 1);
      }
    },
  },
  extraReducers:
    //extraReducers is used for redux thunk
    (builder) => {
      builder.addCase(fetchCountriesThunk.fulfilled, (state, action) => {
        state.countriesList = action.payload?.data;
        state.countriesList = state.countriesList.map((item) => {
          return { ...item, quantity: 0 };
        });
        // localStorage.setItem(
        //   "countriesList",
        //   JSON.stringify(state.countriesList)
        // );
      });
    },
});
// Action creators are generated for each case reducer function
export const { searchCountryNameAction, likeAction } = countrySlice.actions;
//reducer = all countrySlice
export default countrySlice.reducer;

//redux thunk
export const fetchCountriesThunk = createAsyncThunk(
  "countries/fetchcountries",
  async () => {
    try {
      const query =
        "fields=name,capital,currencies,region,population,languages,flag";
      const URL = `https://restcountries.com/v2/all?${query}`;
      const response = await axios.get(URL);

      //console.log("response", response);
      //the value returned becomes the fullfilled action payload
      return {
        data: response.data,
        state: response.status,
      };
    } catch (err) {
      console.log(err);
    }
  }
);
