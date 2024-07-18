import Sidebar from "./components/Sidebar";
import { Box } from "@mui/material";

const App = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box
        sx={{ flexGrow: 1, padding: "10px", border: "1px solid #ccc" }}
      ></Box>
    </Box>
  );
};

export default App;
