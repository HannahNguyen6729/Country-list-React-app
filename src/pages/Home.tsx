import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CountryTable from "../components/CountryTable";
import { fetchCountriesThunk } from "../redux/slice/countrySlice";
import { AppDispatch, RootState } from "../redux/store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { countriesList } = useSelector(
    (state: RootState) => state.countryReducer
  );
  useEffect(() => {
    dispatch(fetchCountriesThunk());
  }, [dispatch]);

  return (
    <Box sx={{ minHeight: window.innerHeight }}>
      <Typography
        variant="h4"
        component="p"
        sx={{ color: "#096942", marginTop: "6%", textAlign: "center" }}
      >
        Country List
      </Typography>
      <CountryTable countryList={countriesList} />
    </Box>
  );
}
