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
  Popover,
  PopoverHandler,
  PopoverContent,
  Avatar,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../styles/tailwind.css";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
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
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
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
      console.log("inside handleLogout");
      logout().then(()=>navigate("/"));
      // navigate("/");
    } catch (err) {
      console.log(err);
    }
    navigate("/home");
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
          to="/"
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
            {/* <Button
              variant="gradient"
              size="sm"
              color="white"
              onClick={handleLogout}
            >
              Logout
            </Button> */}
            <ProfileInfoPopover handleLogout={handleLogout} currentUser={currentUser} />
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
        {!currentUser ? (
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


function ProfileInfoPopover({ handleLogout, currentUser }) {
  const [openPopover, setOpenPopover] = React.useState(false);
  
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };
  const name=currentUser.email.split('@')[0]
  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        <Button variant="gradient"
          size="sm"
          color="white">{name}</Button>
      </PopoverHandler>
      <PopoverContent {...triggers} className="z-50 max-w-[24rem]">
        <div className="mb-2 flex items-center justify-between gap-4">
          <Avatar
            size="md"
            variant="circular"
            src={`https://ui-avatars.com/api/?name=${currentUser.email ? currentUser.email[0].toUpperCase() : ''}&background=random`}
            alt={currentUser.email ? currentUser.email[0].toUpperCase() : ''}
          />
          <Button
            variant="gradient"
            size="sm"
            className="font-medium capitalize"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 flex items-center gap-2 font-medium"
        >
          <span>{currentUser && currentUser.name ? currentUser.name : "Admin"}</span> •{" "}
          <Link
            to={currentUser && currentUser.roles.includes("admin") ? '/admin/application-status' : currentUser.roles.includes("outside student") ? '/internship' : currentUser.roles.includes("faculty")?'/professor/application-status':''}
            className="text-md font-medium text-gray-900"
          >
            {currentUser && currentUser.roles.includes("admin") ? '@applications' : currentUser.roles.includes("outside student") ? 'application form' : currentUser.roles.includes("faculty") ? '@applications':''}
          </Link>
        </Typography>
        {currentUser && currentUser.roles.includes("student") && (<Link
          to="/student-profile"
          variant="small"
          color="gray"
          className="font-normal text-blue-gray-500"
        >
          View Profile
        </Link>)}
        <div className="flex items-center gap-8 border-t border-blue-gray-50 pt-2">
          <Typography
            variant="small"
            color="gray"
            className="flex items-center gap-2 text-sm font-normal text-blue-gray-500"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM2.332 6.027C2.70329 4.96372 3.36579 4.0261 4.244 3.321C4.512 3.73 4.974 4 5.5 4C5.89782 4 6.27936 4.15804 6.56066 4.43934C6.84196 4.72064 7 5.10218 7 5.5V6C7 6.53043 7.21071 7.03914 7.58579 7.41421C7.96086 7.78929 8.46957 8 9 8C9.53043 8 10.0391 7.78929 10.4142 7.41421C10.7893 7.03914 11 6.53043 11 6C10.9998 5.55242 11.1498 5.11773 11.4259 4.76547C11.702 4.41321 12.0883 4.16375 12.523 4.057C13.4773 5.14867 14.0022 6.55002 14 8C14 8.34 13.972 8.675 13.917 9H13C12.4696 9 11.9609 9.21071 11.5858 9.58579C11.2107 9.96086 11 10.4696 11 11V13.197C10.0883 13.7245 9.05331 14.0015 8 14V12C8 11.4696 7.78929 10.9609 7.41421 10.5858C7.03914 10.2107 6.53043 10 6 10C5.46957 10 4.96086 9.78929 4.58579 9.41421C4.21071 9.03914 4 8.53043 4 8C4.00018 7.527 3.83271 7.06924 3.52733 6.70803C3.22195 6.34681 2.79844 6.10552 2.332 6.027Z"
                fill="#90A4AE"
              />
            </svg>
            {currentUser.roles[0] === "outside student" ? "Intern (Outside)" : "IIT Ropar"}
          </Typography>
          
        </div>
      </PopoverContent>
    </Popover>
  );
}