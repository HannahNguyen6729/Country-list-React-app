import React from "react";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
//import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

export default function CartBadge() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { flagList } = useSelector((state: RootState) => state.cartReducer);
  const renderCart = () => {
    return flagList.map((item) => (
      <MenuItem key={item.name}>
        <img src={item.flag} style={{ width: 30, marginRight: 10 }} alt="" />
        {item.name} / {item.quantity}
      </MenuItem>
    ));
  };
  return (
    <>
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
    </>
  );
}
