import { Box, Toolbar } from "@mui/material";
import React from "react";
// import { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import Switch from "@mui/material/Switch";
import CountrySelect from "./CountrySelect";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
//import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { likeAction } from "../redux/slice/countrySlice";

const IconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
}));
const LogoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
}));
interface Mode {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}
export default function NavBar({ mode, setMode }: Mode) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { favoriteCountryList, flag } = useSelector(
    (state: RootState) => state.countryReducer
  );
  const { flagList } = useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch<AppDispatch>();

  const renderFavoriteCountriesList = () => {
    return favoriteCountryList.map((item) => (
      <MenuItem key={item.name}>
        <FavoriteIcon
          onClick={() => dispatch(likeAction({ flag: false, country: item }))}
          sx={{ color: "#17967b", marginRight: 3 }}
        />
        <img src={item.flag} style={{ width: 30, marginRight: 10 }} alt="" />
        {item.name}
      </MenuItem>
    ));
  };
  const renderCart = () => {
    return flagList.map((item) => (
      <MenuItem key={item.name}>
        <img src={item.flag} style={{ width: 30, marginRight: 10 }} alt="" />
        {item.name} / {item.quantity}
      </MenuItem>
    ));
  };

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* <LogoBox>
            <PetsIcon />
            <Typography variant="h6">Hannah Dev</Typography>
          </LogoBox> */}
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <NightsStayIcon />
                </ListItemIcon>
                <ListItemText primary="Themes" />
                <Switch
                  onChange={() =>
                    setMode(mode === "#17967b" ? "#098bdb" : "#17967b")
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
          <CountrySelect />
          <IconBox>
            <Badge badgeContent={favoriteCountryList.length} color="error">
              <div>
                <IconButton onClick={handleClick} size="small">
                  <FavoriteIcon sx={{ color: "white" }} />
                </IconButton>
                {favoriteCountryList.length > 0 ? (
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {renderFavoriteCountriesList()}
                  </Menu>
                ) : (
                  <div></div>
                )}
              </div>
            </Badge>
            <Badge badgeContent={flagList.length} color="error">
              <div>
                <IconButton onClick={handleClick} size="small">
                  <ShoppingCartIcon sx={{ color: "white" }} />
                </IconButton>
                {flagList.length > 0 ? (
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {renderCart()}
                  </Menu>
                ) : (
                  <div></div>
                )}
              </div>
            </Badge>
          </IconBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
