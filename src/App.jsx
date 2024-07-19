import React from "react";
import { Box } from "@mui/material";
import RoomDetails from "./components/RoomDetails";
import Sidebar from "./components/Sidebar"; // Sidebar'ı ekleyelim

const App = () => {
  const [selectedRoom, setSelectedRoom] = React.useState(null);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      <Sidebar onRoomSelect={setSelectedRoom} />
      {selectedRoom && <RoomDetails selectedRoom={selectedRoom} />}
    </Box>
  );
};

export default App;
