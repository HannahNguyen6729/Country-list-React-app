import * as React from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Country } from "../interface/interface";
import { styled } from "@mui/material/styles";
import {
  fetchCountriesThunk,
  searchCountryNameAction,
} from "../redux/slice/countrySlice";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#ffffff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#ffffff",
  },
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": {
      borderColor: "#ffffff",
    },
    "&:hover fieldset": {
      borderColor: "#ffffff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffffff",
    },
  },
});
export default function CountrySelect() {
  const { countriesList } = useSelector(
    (state: RootState) => state.countryReducer
  );
  const dispatch = useDispatch<AppDispatch>();
  const [countryName, setCountryName] = React.useState("");
  const countries: readonly Country[] = countriesList;
  //console.log(countryName);
  return (
    <Box sx={{ display: "flex" }}>
      <Autocomplete
        id="country-select-demo"
        sx={{
          width: "500px",
          "&:hover": { backgroundColor: "rgba(0, 0, 0,0.07)" },
        }}
        size="small"
        options={countries}
        autoHighlight
        // clearIcon={<ClearIcon sx={{ color: "white" }} />}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => {
          console.log("value name", value);
          if (value) {
            setCountryName(value.name);
          } else {
            dispatch(fetchCountriesThunk());
          }
        }}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img loading="lazy" width="20" src={option.flag} alt="" />
            {option.name}
          </Box>
        )}
        renderInput={(params) => (
          <CssTextField
            {...params}
            placeholder="Search country by name…"
            //   label={<SearchIcon />}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
      <Box ml={2}>
        <Button
          variant="contained"
          endIcon={<SearchIcon />}
          onClick={() => {
            dispatch(searchCountryNameAction(countryName));
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
}
