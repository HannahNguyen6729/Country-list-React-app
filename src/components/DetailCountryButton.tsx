import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Country } from "../interface/interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { likeAction } from "../redux/slice/countrySlice";
import ButtonQuantity from "./ButtonQuantity";

interface CountryDetail {
  country: Country;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  border: "1px solid #fff",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};
export default function DetailCountryButton({ country }: CountryDetail) {
  const [open, setOpen] = React.useState(false);
  const { flag, favoriteCountryList } = useSelector(
    (state: RootState) => state.countryReducer
  );
  const dispatch = useDispatch<AppDispatch>();
  let favoriteCountryNameList: string[] = [];
  let countryName: string = "";
  if (favoriteCountryList.length > 0) {
    favoriteCountryNameList = favoriteCountryList.map((item) => item.name);
  }

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <>
      <Tooltip title="More details...">
        <IconButton color="primary" size="small" onClick={handleOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2" mb={2}>
            {country.name}
          </Typography>
          <Box>
            <img src={country.flag} alt="" style={{ width: 450 }} />
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Capital: {country.capital}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Population: {country.population.toLocaleString()}
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            Language:
            {country.languages?.map((item) => (
              <p key={item.name}>{item.name}</p>
            ))}
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {(flag && favoriteCountryNameList.includes(country.name)) ||
            favoriteCountryNameList.includes(country.name) ? (
              <FavoriteIcon
                sx={{
                  color: "#17967b",
                  "&:hover": { cursor: "pointer" },
                }}
                onClick={() =>
                  dispatch(likeAction({ flag: false, country: country }))
                }
              />
            ) : (
              <FavoriteBorderIcon
                sx={{ "&:hover": { cursor: "pointer" } }}
                onClick={() =>
                  dispatch(likeAction({ flag: true, country: country }))
                }
              />
            )}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Quantity:
            <ButtonQuantity countryName={country.name} />
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
