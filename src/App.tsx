import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { TopBar } from "./components/TopBar";
import { useState } from "react";
import SideBar from "./components/SideBar";
import Content from "./components/Content";
import { TodoProvider } from "./context/TodoContext";

function App() {
  const [open, setOpen] = useState(true);
  const theme = createTheme();
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <TodoProvider>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline>
            <TopBar open={open} toggleDrawer={toggleDrawer} />
            <SideBar open={open} toggleDrawer={toggleDrawer} />
            <Content />
          </CssBaseline>
        </Box>
      </ThemeProvider>
    </TodoProvider>
  );
}

export default App;
