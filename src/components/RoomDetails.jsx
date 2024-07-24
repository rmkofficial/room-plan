import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import RoomDetailsHeader from "./RoomDetailsHeader";
import RoomCoordinates from "./RoomCoordinates";
import RoomImageUpload from "./RoomImageUpload";

const RoomDetails = ({ uniqueRoomId, block, floor }) => {
  const [roomImageMap, setRoomImageMap] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  const [selectedPointIndex, setSelectedPointIndex] = useState(null);
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [drawMode, setDrawMode] = useState("point");
  const canvasRef = useRef(null);
  const [lineStart, setLineStart] = useState(null);

  useEffect(() => {
    if (roomImageMap[uniqueRoomId]) {
      setCoordinates(roomImageMap[uniqueRoomId].coordinates);
      setImgDimensions(roomImageMap[uniqueRoomId].imgDimensions);
      setCurrentPage(roomImageMap[uniqueRoomId].currentPage);
      setSelectedPointIndex(null);
    } else {
      setCoordinates([]);
      setImgDimensions({ width: 0, height: 0 });
      setCurrentPage(1);
      setSelectedPointIndex(null);
    }
  }, [uniqueRoomId, roomImageMap]);

  const handleImageUpload = (src) => {
    const updatedRoomImageMap = {
      ...roomImageMap,
      [uniqueRoomId]: {
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
      const [x1, y1, x2, y2, type, address] = line
        .split(",")
        .map((item) => item.trim().split(":")[1].trim());
      return {
        x1: parseFloat(x1),
        y1: parseFloat(y1),
        x2: parseFloat(x2),
        y2: parseFloat(y2),
        type,
        address,
        color: "red",
      };
    });
    setCoordinates(newCoordinates);
  };

  const handleImageClick = (x, y) => {
    const roundedX = parseFloat(x.toFixed(2));
    const roundedY = parseFloat(y.toFixed(2));
    if (drawMode === "point") {
      setCoordinates((prevCoords) => [
        ...prevCoords,
        {
          x1: roundedX,
          y1: roundedY,
          x2: null,
          y2: null,
          type: "point",
          address: "",
          color: "red",
        },
      ]);
    } else if (drawMode === "line") {
      if (lineStart) {
        setCoordinates((prevCoords) => [
          ...prevCoords,
          {
            x1: lineStart.x,
            y1: lineStart.y,
            x2: roundedX,
            y2: roundedY,
            type: "line",
            address: "",
            color: "red",
          },
        ]);
        setLineStart(null);
      } else {
        setLineStart({ x: roundedX, y: roundedY });
      }
    }
  };

  const handleImageLoad = ({ width, height }) => {
    setImgDimensions({ width, height });
  };

  const handleCoordinateChange = (index, field, value) => {
    setCoordinates((prevCoords) => {
      const newCoords = [...prevCoords];
      newCoords[index][field] =
        field === "x1" || field === "y1" || field === "x2" || field === "y2"
          ? parseFloat(value)
          : value;
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
      !uniqueRoomId ||
      coordinates.some(
        (coord) =>
          !coord.x1 ||
          !coord.y1 ||
          (coord.type === "line" && (!coord.x2 || !coord.y2)) ||
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
    img.src = roomImageMap[uniqueRoomId].imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `blok_${block}_kat_${floor}_oda_${uniqueRoomId}.png`;
      link.href = dataUrl;
      link.click();

      const coordinatesText = coordinates
        .map(
          (coord) =>
            `X1: ${coord.x1}, Y1: ${coord.y1}, X2: ${coord.x2 || ""}, Y2: ${
              coord.y2 || ""
            }, Type: ${coord.type}, Address: ${coord.address}`
        )
        .join("\n");

      const txtBlob = new Blob([coordinatesText], { type: "text/plain" });
      const txtUrl = URL.createObjectURL(txtBlob);
      const txtLink = document.createElement("a");
      txtLink.download = `blok_${block}_kat_${floor}_oda_${uniqueRoomId}.txt`;
      txtLink.href = txtUrl;
      txtLink.click();
      URL.revokeObjectURL(txtUrl);
    };

    const updatedRoomImageMap = {
      ...roomImageMap,
      [uniqueRoomId]: {
        ...roomImageMap[uniqueRoomId],
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
        selectedRoom={uniqueRoomId}
        onImageUpload={handleImageUpload}
        onSave={handleSave}
        onTxtUpload={handleTxtUpload}
        onDrawModeChange={setDrawMode}
        drawMode={drawMode}
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
            imageSrc={roomImageMap[uniqueRoomId]?.imageSrc}
            coordinates={coordinates}
            onImageClick={handleImageClick}
            onImageLoad={handleImageLoad}
            onPointClick={handlePointSelect}
            selectedPointIndex={selectedPointIndex}
            drawMode={drawMode}
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
  uniqueRoomId: PropTypes.string.isRequired,
  block: PropTypes.string.isRequired,
  floor: PropTypes.string.isRequired,
};

export default RoomDetails;
