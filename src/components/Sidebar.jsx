import PropTypes from "prop-types";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
} from "@mui/material";
import { categoryNamesBlokKatMap } from "../data";

const Sidebar = ({ onRoomSelect }) => {
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleBlockChange = (event) => {
    setSelectedBlock(event.target.value);
    setSelectedFloor("");
    setSelectedRoom("");
  };

  const handleFloorChange = (event) => {
    setSelectedFloor(event.target.value);
    setSelectedRoom("");
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    onRoomSelect(room);
  };

  const blocks = Object.keys(categoryNamesBlokKatMap);
  const floors = selectedBlock
    ? Object.keys(categoryNamesBlokKatMap[selectedBlock])
    : [];
  const rooms =
    selectedBlock && selectedFloor
      ? categoryNamesBlokKatMap[selectedBlock][selectedFloor]
      : [];

  return (
    <Box
      sx={{
        width: "25%",
        padding: "10px",
        boxSizing: "border-box",
        border: "1px solid #ccc",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="block-select-label">Block</InputLabel>
          <Select
            labelId="block-select-label"
            id="block-select"
            value={selectedBlock}
            onChange={handleBlockChange}
          >
            {blocks.map((block) => (
              <MenuItem key={block} value={block}>
                {block}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth disabled={!selectedBlock}>
          <InputLabel id="floor-select-label">Floor</InputLabel>
          <Select
            labelId="floor-select-label"
            id="floor-select"
            value={selectedFloor}
            onChange={handleFloorChange}
          >
            {floors.map((floor) => (
              <MenuItem key={floor} value={floor}>
                {floor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {rooms.length > 0 && (
        <Box sx={{ marginTop: "10px" }}>
          <strong>Rooms:</strong>
          <List>
            {rooms.map((room) => (
              <ListItem
                key={room}
                sx={{
                  "&:hover": { backgroundColor: "#f5f5f5" },
                  backgroundColor:
                    selectedRoom === room ? "lightblue" : "transparent",
                  cursor: "pointer",
                }}
                onClick={() => handleRoomClick(room)}
              >
                <ListItemIcon>
                  <Checkbox edge="start" />
                </ListItemIcon>
                <ListItemText primary={room} sx={{ cursor: "pointer" }} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

Sidebar.propTypes = {
  onRoomSelect: PropTypes.func.isRequired,
};

export default Sidebar;
