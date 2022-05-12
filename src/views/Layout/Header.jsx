import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/action/userAction"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { pagesTitle, pages, guestPage } from '../../links/pages';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 30,
    },
    title: {
        flexGrow: 1,
    },
}));
const Header = () => {

    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isLogin } = useSelector(state => state.user);
    const [menuState, setmenuState] = useState({ isHome: true, title: "Aline Tour And Travels" });
    const checkMenuHead = () => {
        if (location.pathname == pages.HOME) {
            if (!menuState.isHome) {
                setmenuState({
                    isHome: true,
                    title: "Aline Tour And Travels"
                });
            }
        } else if (guestPage.includes(location.pathname)) {
            if (!menuState.isHome) {
                setmenuState({
                    isHome: true,
                    title: "Aline Tour And Travels"
                });
            }
        } else {
            const key = Object.keys(pages).find(key => pages[key] === location.pathname);
            if (pagesTitle.hasOwnProperty(key)) {
                if (menuState.isHome) {
                    setmenuState({
                        isHome: false,
                        title: pagesTitle[key]
                    });
                }
            } else {
                if (!menuState.isHome) {
                    setmenuState({
                        isHome: true,
                        title: "Aline Tour And Travels"
                    });
                }
            }
        }
    }

    useEffect(() => {
        checkMenuHead();
    });
    const goBackPage = () => {
        window.history.back();
    }
    const logoutButton = () => {
        dispatch(setLogout());
        window.location.href = pages.LOGIN;
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{ marginBottom: "80px" }}>
            <AppBar>
                <Toolbar>
                    {menuState.isHome == true ? (<></>) : (
                        <IconButton onClick={goBackPage} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <ArrowBackIcon />
                        </IconButton>
                    )}
                    <Typography className={classes.title} variant="h6">{menuState.title}</Typography>
                    {isLogin && (
                        <div>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={logoutButton}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div >
    );
};

export default Header;