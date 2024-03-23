import React, { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../styles/tailwind.css";
import { useAuth } from "../contexts/authContext";
// import { useNavigate } from "react-router-dom";
import { useRef } from "react";
const excludedRoutes = ["/login", "/signup"];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography
            as="div"
            variant="small"
            className="flex items-center justify-center lg:mt-0 lg:mb-0 font-medium hover:text-blue-gray-900"
          >
            <ListItem
              className="text-white bg-color no-underline flex items-center gap-2 py-2 pr-4 text-md"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Programs
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="no-underline hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="no-underline grid grid-cols-1 gap-y-2 outline-none outline-0 pl-1">
            <NavLink to="/" className="no-underline">
              <MenuItem className="no-underline flex items-center gap-3 rounded-lg ">
                <div>
                  <Typography
                    variant="h6"
                    className="no-underline flex items-center text-sm font-bold lg:text-blue-gray-900"
                  >
                    UG Program
                  </Typography>
                </div>
              </MenuItem>
            </NavLink>
            <NavLink to="/" className="no-underline">
              <MenuItem className="no-underline flex items-center gap-3 rounded-lg">
                <div>
                  <Typography
                    variant="h6"
                    className="no-underline flex items-center text-sm font-bold lg:text-blue-gray-900"
                  >
                    PG Program
                  </Typography>
                </div>
              </MenuItem>
            </NavLink>
            <NavLink to="/internship" className="no-underline">
              <MenuItem className="no-underline flex items-center gap-3 rounded-lg">
                <div>
                  <Typography
                    variant="h6"
                    className="no-underline flex items-center text-sm font-bold lg:text-blue-gray-900"
                  >
                    Intern Students
                  </Typography>
                </div>
              </MenuItem>
            </NavLink>
            <NavLink to="/intership" className="no-underline">
              <MenuItem className="no-underline flex items-center gap-3 rounded-lg">
                <div>
                  <Typography
                    variant="h6"
                    className="no-underline flex items-center text-sm font-bold lg:text-blue-gray-900"
                  >
                    Student Exchange
                  </Typography>
                </div>
              </MenuItem>
            </NavLink>
          </ul>
        </MenuList>
      </Menu>
      <div className="no-underline block lg:hidden">
        <Collapse open={isMobileMenuOpen}>
          <NavLink to="/" className="no-underline text-white">
            <MenuItem className="no-underline flex items-center gap-3 rounded-lg">
              <div>
                <Typography
                  variant="h6"
                  className="no-underline flex items-center text-sm font-bold lg:text-white"
                >
                  UG Program
                </Typography>
              </div>
            </MenuItem>
          </NavLink>
          <NavLink to="/" className="no-underline text-white">
            <MenuItem className="no-underline flex items-center gap-3 rounded-lg">
              <div>
                <Typography
                  variant="h6"
                  className="no-underline flex items-center text-sm font-bold lg:text-blue-gray-900"
                >
                  PG Program
                </Typography>
              </div>
            </MenuItem>
          </NavLink>
          <NavLink to="/internship" className="no-underline text-white">
            <MenuItem className="no-underline flex items-center gap-3 rounded-lg">
              <div>
                <Typography
                  variant="h6"
                  className="no-underline flex items-center text-sm font-bold lg:text-blue-gray-900"
                >
                  Intern Students
                </Typography>
              </div>
            </MenuItem>
          </NavLink>
          <NavLink to="/internship" className="no-underline text-white">
            <MenuItem className="no-underline flex items-center gap-3 rounded-lg">
              <div>
                <Typography
                  variant="h6"
                  className="no-underline flex items-center text-sm font-bold lg:text-blue-gray-900"
                >
                  Student Exchange
                </Typography>
              </div>
            </MenuItem>
          </NavLink>
        </Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="no-underline mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 lg:mr-10">
      <Typography
        as={NavLink}
        to="/home"
        variant="small"
        color="white"
        className="no-underline "
      >
        <ListItem className="no-underline flex items-center gap-2 py-2 pr-4 text-md">
          Home
        </ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as={NavLink}
        to="/contact"
        variant="small"
        color="white"
        className="no-underline font-medium"
      >
        <ListItem className="no-underline flex items-center gap-2 py-2 pr-4 text-md">
          Contact Us
        </ListItem>
      </Typography>
    </List>
  );
}

export default function Headers() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const handleDropdownToggle = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenDropdown(false);
    }
  };
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  // console.log("inside header ",currentUser)
  const [shouldRenderNavbar, setShouldRenderNavbar] = useState(
    !excludedRoutes.includes(location.pathname) // Initial render based on route
  );
  const handleLogout = async () => {
    try {
      // console.log("inside handleLogout");
      logout().then(()=>{console.log('here after logout');navigate("/home")});
      // navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setShouldRenderNavbar(!excludedRoutes.includes(location.pathname));
    };
  }, [location]);

  const handleSignInClick = () => {
    // Redirect to the "/login" page
    navigate("/login");
  };

  return (
    <Navbar className="no-underline mx-auto max-w-full lg:px-20 py-0 bg-color rounded-none">
      <div className="no-underline flex items-center justify-between text-blue-gray-900">
        <Typography
          as={NavLink}
          to="/home"
          variant="h6"
          className="no-underline mr-4 cursor-pointer py-1.5 lg:ml-2 flex items-center text-white text-lg"
        >
          <img
            src={require("../images/iitropar.png")}
            alt="logo"
            className="no-underline w-16 h-16 mr-4 "
          />
          Hostel IIT Ropar
        </Typography>
        <div className="no-underline hidden lg:block">
          <NavList />
        </div>
        {currentUser ? (
          <div className="no-underline hidden gap-2 lg:flex">
            <Button
              variant="gradient"
              size="sm"
              color="white"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="no-underline hidden gap-2 lg:flex">
            <Button
              variant="gradient"
              size="sm"
              color="white"
              onClick={handleSignInClick}
            >
              Sign In
            </Button>
          </div>
        )}
        <IconButton
          variant="text"
          color="white"
          className="no-underline lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="no-underline h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="no-underline h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav} className="no-underline color-white">
        <NavList />
       {!currentUser ?(
          <NavLink to="/login" className="text-decoration-none">
          <div className="no-underline flex w-full flex-nowrap items-center gap-2 lg:hidden mb-2">
            <Button variant="gradient" size="sm" fullWidth color="white" onClick={handleSignInClick}>
              Login
            </Button>
          </div>
        </NavLink>
      ) : (
        <div className="no-underline flex w-full flex-nowrap items-center gap-2 lg:hidden mb-2">
            <Button variant="gradient" size="sm" fullWidth color="white" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </Collapse>
    </Navbar>
  );
}
