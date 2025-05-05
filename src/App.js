import { createTheme } from "@mui/material/styles";
import React from "react";
import { ThemeProvider } from "react-bootstrap";
import "./App.module.css";
import TodoList from "./Componants/TodoList/TodoList";

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["A"],
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          background: "#0d6efd",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "A",
        }}
      >
        <TodoList />
      </div>
    </ThemeProvider>
  );
};

export default App;
