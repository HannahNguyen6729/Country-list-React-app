import React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Country, CountryState } from "../interface/interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { likeAction } from "../redux/slice/countrySlice";
import { addFlagAction, removeFlagAction } from "../redux/slice/cartSlice";
import ButtonQuantity from "./ButtonQuantity";
import DetailCountryButton from "./DetailCountryButton";
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}
function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRightIcon />
        ) : (
          <KeyboardArrowLeftIcon />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeftIcon />
        ) : (
          <KeyboardArrowRightIcon />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#a8e3ca",
    //theme.palette.common.black
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f0faf6", //theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export interface List {
  countryList: Country[];
}
export interface NameList {
  favoriteCountryNameList: string[];
}
export default function CountryTable({ countryList }: List) {
  const { flag, favoriteCountryList } = useSelector(
    (state: RootState) => state.countryReducer
  );
  const { flagList } = useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch<AppDispatch>();
  let favoriteCountryNameList: string[] = [];
  let countryName: string = "";
  if (favoriteCountryList.length > 0) {
    favoriteCountryNameList = favoriteCountryList.map((item) => item.name);
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - countryList.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box m={5}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Flag </StyledTableCell>
              <StyledTableCell>Capital</StyledTableCell>
              <StyledTableCell>Region</StyledTableCell>
              <StyledTableCell>Population</StyledTableCell>
              <StyledTableCell>Languages</StyledTableCell>
              <StyledTableCell>Currencies</StyledTableCell>
              <StyledTableCell>Buy flag</StyledTableCell>
              <StyledTableCell>Favorite</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? countryList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : countryList
            ).map((country, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ width: "20%" }}
                >
                  {country.name}
                  <DetailCountryButton country={country} />
                </StyledTableCell>
                <StyledTableCell sx={{ width: "10%" }}>
                  <img src={country.flag} style={{ width: 100, height: 70 }} />
                </StyledTableCell>
                <StyledTableCell sx={{ width: "10%" }}>
                  {country.capital}
                </StyledTableCell>
                <StyledTableCell sx={{ width: "10%" }}>
                  {country.region}
                </StyledTableCell>
                <StyledTableCell sx={{ width: "10%" }}>
                  {country.population.toLocaleString()}
                </StyledTableCell>
                <StyledTableCell sx={{ width: "10%" }}>
                  {country.languages?.map((item) => item.name)}
                </StyledTableCell>
                <StyledTableCell sx={{ width: "10%" }}>
                  {country.currencies?.map((item, index) => {
                    return (
                      <Box mr={1} key={index}>
                        {item.name}
                      </Box>
                    );
                  })}
                </StyledTableCell>
                <StyledTableCell sx={{ width: "10%" }}>
                  <ButtonGroup variant="contained">
                    <Button
                      size="small"
                      onClick={() =>
                        dispatch(
                          removeFlagAction({ country: country, quantity: -1 })
                        )
                      }
                    >
                      -
                    </Button>
                    <ButtonQuantity countryName={country.name} />
                    <Button
                      size="small"
                      onClick={() => {
                        dispatch(
                          addFlagAction({ country: country, quantity: 1 })
                        );
                      }}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </StyledTableCell>
                <StyledTableCell sx={{ width: "10%" }}>
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
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={countryList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}
