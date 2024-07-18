import PropTypes from "prop-types";
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

const RoomDetailsHeader = ({ selectedRoom }) => {
  return (
    <Box
      sx={{
        width: "100%",
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
        <Typography variant="h6">{selectedRoom}</Typography>
        <Button
          variant="contained"
          component="label"
          sx={{ flexShrink: 0, width: "250px" }}
        >
          Upload Room Plan (PNG)
          <input type="file" hidden accept=".png" />
        </Button>
        <Button
          variant="contained"
          component="label"
          sx={{ flexShrink: 0, width: "250px" }}
        >
          Upload Room Plan (TXT)
          <input type="file" hidden accept=".txt" />
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
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

RoomDetailsHeader.propTypes = {
  selectedRoom: PropTypes.string.isRequired,
};

export default RoomDetailsHeader;
