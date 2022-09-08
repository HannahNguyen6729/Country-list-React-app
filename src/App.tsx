import React from "react";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export default function App() {
  const [mode, setMode] = useState("#17967b");
  const theme = createTheme({
    palette: {
      primary: {
        main: mode,
        light: "#fff",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavBar mode={mode} setMode={setMode} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to={""} />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </ThemeProvider>
    </>
  );
}
