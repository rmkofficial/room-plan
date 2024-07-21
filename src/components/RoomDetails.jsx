import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import RoomDetailsHeader from "./RoomDetailsHeader";
import RoomCoordinates from "./RoomCoordinates";
import RoomImageUpload from "./RoomImageUpload";

const RoomDetails = ({ selectedRoom, block, floor }) => {
  const [roomImageMap, setRoomImageMap] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  const [selectedPointIndex, setSelectedPointIndex] = useState(null);
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (roomImageMap[selectedRoom]) {
      setCoordinates(roomImageMap[selectedRoom].coordinates);
      setImgDimensions(roomImageMap[selectedRoom].imgDimensions);
      setCurrentPage(roomImageMap[selectedRoom].currentPage);
      setSelectedPointIndex(null);
    } else {
      setCoordinates([]);
      setImgDimensions({ width: 0, height: 0 });
      setCurrentPage(1);
      setSelectedPointIndex(null);
    }
  }, [selectedRoom, roomImageMap]);

  const handleImageUpload = (src) => {
    const updatedRoomImageMap = {
      ...roomImageMap,
      [selectedRoom]: {
        imageSrc: src,
        coordinates: [],
        imgDimensions: { width: 0, height: 0 },
        currentPage: 1,
      },
    };
    setRoomImageMap(updatedRoomImageMap);
  };

  const handleTxtUpload = (text) => {
    const lines = text.split("\n");
    const newCoordinates = lines.map((line) => {
      const [x, y, address] = line
        .split(",")
        .map((item) => item.trim().split(":")[1].trim());
      return {
        x: parseFloat(x),
        y: parseFloat(y),
        address,
        color: "red",
      };
    });
    setCoordinates(newCoordinates);
  };

  const handleImageClick = (x, y) => {
    const color = "red";
    const roundedX = parseFloat(x.toFixed(2));
    const roundedY = parseFloat(y.toFixed(2));
    setCoordinates((prevCoords) => [
      ...prevCoords,
      { x: roundedX, y: roundedY, address: "", color },
    ]);
  };

  const handleImageLoad = ({ width, height }) => {
    setImgDimensions({ width, height });
  };

  const handleCoordinateChange = (index, field, value) => {
    setCoordinates((prevCoords) => {
      const newCoords = [...prevCoords];
      newCoords[index][field] =
        field === "x" || field === "y" ? parseFloat(value) : value;
      return newCoords;
    });
  };

  const handleCoordinateDelete = (index) => {
    setCoordinates((prevCoords) => prevCoords.filter((_, i) => i !== index));
  };

  const handlePointSelect = (index) => {
    setSelectedPointIndex(index);
  };

  const handleSave = () => {
    if (
      !selectedRoom ||
      coordinates.some(
        (coord) =>
          !coord.x ||
          !coord.y ||
          !coord.address ||
          isNaN(coord.address) ||
          coord.address === ""
      )
    ) {
      setError(
        "Please fill in all fields correctly. Address must be a non-empty numeric value."
      );
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = roomImageMap[selectedRoom].imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `blok_${block}_kat_${floor}_oda_${selectedRoom}.png`;
      link.href = dataUrl;
      link.click();

      // Koordinatları içeren bir txt dosyası oluştur
      const coordinatesText = coordinates
        .map(
          (coord) => `X: ${coord.x}, Y: ${coord.y}, Address: ${coord.address}`
        )
        .join("\n");

      const txtBlob = new Blob([coordinatesText], { type: "text/plain" });
      const txtUrl = URL.createObjectURL(txtBlob);
      const txtLink = document.createElement("a");
      txtLink.download = `blok_${block}_kat_${floor}_oda_${selectedRoom}.txt`;
      txtLink.href = txtUrl;
      txtLink.click();
      URL.revokeObjectURL(txtUrl);
    };

    const updatedRoomImageMap = {
      ...roomImageMap,
      [selectedRoom]: {
        ...roomImageMap[selectedRoom],
        coordinates,
        imgDimensions,
        currentPage,
      },
    };
    setRoomImageMap(updatedRoomImageMap);

    setError(null);
  };

  const itemsPerPage = 20;
  const totalPages = Math.ceil(coordinates.length / itemsPerPage);
  const currentCoordinates = coordinates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box
      sx={{
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        marginBottom: "10px",
      }}
    >
      <RoomDetailsHeader
        selectedRoom={selectedRoom}
        onImageUpload={handleImageUpload}
        onSave={handleSave}
        onTxtUpload={handleTxtUpload}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ width: "300px", padding: "10px", flexShrink: 0 }}>
          <RoomCoordinates
            coordinates={currentCoordinates}
            onCoordinateChange={handleCoordinateChange}
            onCoordinateDelete={handleCoordinateDelete}
            selectedPointIndex={selectedPointIndex}
            onRowClick={handlePointSelect}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                sx={{
                  cursor: "pointer",
                  padding: "5px 10px",
                  margin: "0 5px",
                  backgroundColor:
                    currentPage === index + 1 ? "lightblue" : "white",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                {index + 1}
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflow: "hidden",
            padding: "10px",
            width: imgDimensions.width,
            height: imgDimensions.height,
          }}
        >
          <RoomImageUpload
            imageSrc={roomImageMap[selectedRoom]?.imageSrc}
            coordinates={coordinates}
            onImageClick={handleImageClick}
            onImageLoad={handleImageLoad}
            onPointClick={handlePointSelect}
            selectedPointIndex={selectedPointIndex}
          />
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </Box>
      </Box>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

RoomDetails.propTypes = {
  selectedRoom: PropTypes.string.isRequired,
  block: PropTypes.string.isRequired,
  floor: PropTypes.string.isRequired,
};

export default RoomDetails;
