import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import noImage from "../assets/noImage.jpg";

function NewsDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/");
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            width: 700,
            maxHeight: { xs: 300, md: 600 },
            maxWidth: { xs: 360, md: 700 },
          }}
        >
          {location.state.item.title}
        </Typography>
        <Box
          component="img"
          sx={{
            height: 400,
            width: 700,
            maxHeight: { xs: 300, md: 600 },
            maxWidth: { xs: 380, md: 700 },
            alignItems: "center",
          }}
          alt="The house from the offer."
          src={
            location.state.item.urlToImage
              ? location.state.item.urlToImage
              : noImage
          }
        />
        <Typography
          sx={{
            width: 700,
            maxHeight: { xs: 300, md: 600 },
            maxWidth: { xs: 360, md: 700 },
          }}
          variant="h6"
        >
          Description :{" "}
          {location.state.item.description
            ? location.state.item.description
            : "There is no description available for this Advertisement"}
        </Typography>
        <Typography
          sx={{
            width: 700,
            maxHeight: { xs: 300, md: 600 },
            maxWidth: { xs: 360, md: 700 },
          }}
          variant="h6"
        >
          Content :{" "}
          {location.state.item.content
            ? location.state.item.content
            : "There is no content available for this Advertisement"}
        </Typography>
      </Box>
      <Box
        onClick={backToHome}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2rem",
          color: "blue",
          cursor: "pointer",
          marginBottom: 5,
        }}
      >
        <Button
          size="small"
          onClick={backToHome}
          sx={{
            width: 700,
            maxHeight: { xs: 300, md: 600 },
            maxWidth: { xs: 360, md: 700 },
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <ArrowBackIosIcon sx={{ fontSize: 14, marginLeft: 0.5 }} />
          <p>Back to list</p>
        </Button>
      </Box>
    </>
  );
}

export default NewsDetails;
