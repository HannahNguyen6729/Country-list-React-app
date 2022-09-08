import React from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

interface Name {
  countryName: string;
}
export default function ButtonQuantity({ countryName }: Name) {
  const [quantity, setQuantity] = React.useState(0);
  const { flagList } = useSelector((state: RootState) => state.cartReducer);
  React.useEffect(() => {
    const foundCountry = flagList?.find((item) => item.name === countryName);
    //console.log(foundCountry);
    if (foundCountry) {
      setQuantity(foundCountry.quantity);
    } else {
      setQuantity(0);
    }
  }, [flagList, countryName]);
  return (
    <>
      <Button size="medium"> {quantity}</Button>
    </>
  );
}
