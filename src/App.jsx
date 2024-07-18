import { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import RoomDetails from "./components/RoomDetails";

const App = () => {
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar onRoomSelect={handleRoomSelect} />
      <Box
        sx={{
          flexGrow: 1,
          padding: "10px",
          border: "1px solid #ccc",
          overflow: "hidden",
        }}
      >
        {selectedRoom && <RoomDetails selectedRoom={selectedRoom} />}
      </Box>
    </Box>
  );
};

export default App;
