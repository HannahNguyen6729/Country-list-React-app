import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountriesThunk } from '../redux/slice/countrySlice'
import { AppDispatch, RootState } from '../redux/store'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { countriesList } = useSelector(
    (state: RootState) => state.countryReducer
  )
  console.log('state countryReducer', countriesList)
  useEffect(() => {
    dispatch(fetchCountriesThunk())
  }, [dispatch])
  return (
    <div>
      <h1>Homepage</h1>
    </div>
  )
}
