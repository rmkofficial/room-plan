import PropTypes from "prop-types";
import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { green } from "@mui/material/colors";

const RoomDetailsHeader = ({
  uniqueRoomId,
  onImageUpload,
  onSave,
  onTxtUpload,
}) => {
  const [inputKey, setInputKey] = useState(Date.now());

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageUpload(e.target.result);
        setInputKey(Date.now());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTxtUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        onTxtUpload(text);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Box
      sx={{
        width: "98%",
        padding: "10px",
        border: "1px solid #ccc",
        marginBottom: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">{uniqueRoomId}</Typography>
        <Button
          variant="contained"
          component="label"
          sx={{ flexShrink: 0, width: "250px" }}
        >
          Upload Room Plan (PNG)
          <input
            key={inputKey}
            type="file"
            hidden
            accept=".png"
            onChange={handleImageUpload}
          />
        </Button>
        <Button
          variant="contained"
          component="label"
          sx={{ flexShrink: 0, width: "250px" }}
        >
          Upload Room Plan (TXT)
          <input type="file" hidden accept=".txt" onChange={handleTxtUpload} />
        </Button>
        <FormControl sx={{ flexShrink: 0, width: "250px" }}>
          <InputLabel id="copy-room-plan-label">Copy Room Plan</InputLabel>
          <Select
            labelId="copy-room-plan-label"
            id="copy-room-plan"
            value=""
            onChange={() => {}}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {/* Dropdown seçenekleri buraya eklenebilir */}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{
            backgroundColor: green[500],
            color: "white",
            flexShrink: 0,
            width: "100px",
            marginRight: "30px",
            "&:hover": { backgroundColor: green[700] },
          }}
          onClick={onSave}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

RoomDetailsHeader.propTypes = {
  uniqueRoomId: PropTypes.string.isRequired,
  onImageUpload: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onTxtUpload: PropTypes.func.isRequired,
};

export default RoomDetailsHeader;
