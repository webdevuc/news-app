import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  Drawer,
  FormControl,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Select,
} from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import {
  countryCode,
  countryName,
  searchText,
} from "../actions/headLineAction";
import { countries } from "../constants/Country";
import { getHeadLines } from "../actions/headLineAction";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const useStyles = makeStyles((theme) => ({
  linkStyle: {
    color: "#fff",
    textDecoration: "none",
  },
  active: {
    color: "#ff66ff",
    textDecoration: "none",
    height: 40,
  },
}));
export default function Sidebar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [country, setCountry] = React.useState("us");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [serachQuery, setSearchQuery] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (index) => {
    setActiveIndex(index);
  };
  const toggleDrawer = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    console.log("event", event);
    dispatch(countryCode(event.target.value));
    setCountry(event.target.value);
  };
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = (val) => {
    dispatch(getHeadLines(val));
    setAnchorEl(null);
  };
  const dataValue = (data) => {
    dispatch(countryName(data.country));
  };
  React.useEffect(() => {
    dispatch(searchText(serachQuery));
  }, [dispatch, serachQuery]);
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      open={openMenu}
      onClose={handleCloseMenu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      {countries.map((data) => {
        return (
          <MenuItem
            value={data.code}
            onClick={() => handleCloseMenu(data.code)}
          >
            {data.country}
          </MenuItem>
        );
      })}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: "#660066", cursor: "pointer" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", gap: 5 }}>
            <Link
              to="/"
              className={activeIndex === 0 ? classes.active : classes.linkStyle}
              onClick={() => handleClick(0)}
            >
              <Box>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  Top News
                </Typography>
              </Box>
            </Link>
            <Link
              to="/categories"
              className={activeIndex === 1 ? classes.active : classes.linkStyle}
              onClick={() => handleClick(1)}
            >
              <Box>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  Categories
                </Typography>
              </Box>
            </Link>
            <Link
              to="/gb"
              className={activeIndex === 2 ? classes.active : classes.linkStyle}
              onClick={() => handleClick(2)}
            >
              <Box>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  GB
                </Typography>
              </Box>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: "flex" } }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={serachQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Search>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block", md: "flex" } }}>
            <FormControl sx={{ minWidth: 100 }} size="small">
              <Select
                value={country}
                onChange={handleChange}
                defaultValue={1}
                sx={{
                  boxShadow: "none",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  color: "#fff",
                  ".MuiSvgIcon-root ": {
                    color: "#fff",
                  },
                }}
              >
                {countries.map((data) => {
                  return (
                    <MenuItem value={data.code} onClick={() => dataValue(data)}>
                      {data.country}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton
              id="demo-positioned-button"
              aria-controls={openMenu ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleClickMenu}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            backgroundColor: "#660066",
            color: "#ffb3ff",
          },
          marginTop: 10,
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box>
          <Box>
            <IconButton
              size="large"
              edge="start"
              aria-label="open drawer"
              sx={{
                display: { xs: "block", sm: "none" },
                position: "absolute",
                right: "0",
              }}
              onClick={handleClose}
            >
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>
          <Box sx={{ marginTop: 5 }}>
            <List>
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className={classes.linkStyle}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <NewspaperIcon
                      sx={{ color: "#fff", marginRight: "10px" }}
                    />
                    <ListItemText primary="Top News" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link
                to="/categories"
                onClick={() => setOpen(false)}
                className={classes.linkStyle}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <CategoryIcon sx={{ color: "#fff", marginRight: "10px" }} />
                    <ListItemText primary="Categories" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link
                to="/gb"
                onClick={() => setOpen(false)}
                className={classes.linkStyle}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ClassIcon sx={{ color: "#fff", marginRight: "10px" }} />
                    <ListItemText primary="GB" />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </Box>
        </Box>
      </Drawer>
      {renderMobileMenu}
    </Box>
  );
}
