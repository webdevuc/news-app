import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Button, CircularProgress, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getHeadLines } from "../actions/headLineAction";
import { useEffect } from "react";
import idx from "idx";
import noImage from "../assets/noImage.jpg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const NewsCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const articles = useSelector((state) =>
    idx(state, (_) => _.headLines.article.articles)
  );
  const searchText = useSelector((state) =>
    idx(state, (_) => _.search.searchQuery)
  );
  const countryCode = useSelector((state) =>
    idx(state, (_) => _.countries.country)
  );
  const countryName = useSelector((state) =>
    idx(state, (_) => _.countryName.name)
  );
  const isLoading = useSelector((state) =>
    idx(state, (_) => _.headLines.loading)
  );

  useEffect(() => {
    dispatch(getHeadLines(countryCode));
  }, [dispatch, countryCode]);

  const results = articles?.filter((article) => {
    if (searchText == "") {
      return article;
    } else if (
      article?.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      article?.description?.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return article;
    }
  });

  const handleNewDetails = (item) => {
    navigate("/news/:id", { state: { item } });
  };

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Top news from {countryName ? countryName : " United state"}
      </Typography>
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          width: "100%",
          justifyContent: "center",
          marginBottom: 5,
          fontSize: {
            xs: "1rem",
          },
        }}
      >
        {isLoading && <CircularProgress />}
        {results?.length ? (
          results?.map((item, i) => {
            return (
              <Card
                sx={{
                  maxWidth: 440,
                  marginTop: 5,
                  boxShadow: 4,
                  maxHeight: 560,
                }}
              >
                <CardHeader
                  sx={{ height: "13%" }}
                  title={item.title.substring(0, 60) + "..."}
                />
                <CardMedia
                  component="img"
                  height="250"
                  image={item.urlToImage ? item.urlToImage : noImage}
                  alt="urlToImage"
                />
                <CardContent sx={{ height: "15%" }}>
                  <Typography variant="h6" color="text.secondary" fontSize={14}>
                    {item?.description !== undefined
                      ? item?.description?.substring(0, 180) + "..."
                      : "There is no description available for this Advertise"}
                  </Typography>
                </CardContent>
                <CardActions
                  disableSpacing
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "2px",
                  }}
                >
                  <Button size="small" onClick={() => handleNewDetails(item)}>
                    <p>More</p>
                    <ArrowForwardIosIcon
                      sx={{ fontSize: 14, marginLeft: 0.5 }}
                    />
                  </Button>
                </CardActions>
              </Card>
            );
          })
        ) : (
          <Typography variant="h5" marginTop="10rem" color="#8a8a5c">
            {isLoading ? "" : "No news found"}
          </Typography>
        )}
      </Container>
    </>
  );
};
export default NewsCard;
