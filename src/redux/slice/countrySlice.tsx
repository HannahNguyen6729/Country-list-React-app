import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface Country {
  name: {
    common: string
  }
  capital: string[]
  currencies: {
    [key: string]: {
      name: string
    }
  }
  languages: {
    [key: string]: string
  }
}
export interface CountryState {
  countriesList: Country[]
}

const initialState: CountryState = {
  countriesList: [],
}
export const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers:
    //extraReducers is used for redux thunk
    (builder) => {
      builder.addCase(fetchCountriesThunk.fulfilled, (state, action) => {
        console.log(action)
        state.countriesList = action.payload?.data
        console.log(state.countriesList)
      })
    },
})
// Action creators are generated for each case reducer function
//export const { increment } = countrySlice.actions
//reducer = all countrySlice
export default countrySlice.reducer

//redux thunk
export const fetchCountriesThunk = createAsyncThunk(
  'countries/fetchcountries',
  async () => {
    try {
      const query = 'fields=name,capital,currencies'
      const URL = `https://restcountries.com/v3.1/all/?${query}`
      const response = await axios.get(URL)
      console.log('response', response)
      //the value returned becomes the fullfilled action payload
      return {
        data: response.data,
        state: response.status,
      }
    } catch (err) {
      console.log(err)
    }
  }
)
