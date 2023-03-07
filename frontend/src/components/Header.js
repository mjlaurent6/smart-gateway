import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {Logout} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {getUser, selectUser} from "../features/appSlice";
import {useNavigate} from "react-router-dom";

function Header(props) {
    const {onDrawerToggle} = props;
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        dispatch(selectUser({
            user: null,
        }))
        navigate("/");
    }
    return (<React.Fragment>
        <AppBar color="light" position="sticky" elevation={1}>
            <Toolbar>
                <Grid container spacing={1} alignItems="center">
                    <Grid sx={{display: {sm: "none", xs: "block"}}} item>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={onDrawerToggle}
                            edge="start"
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs/>
                    <Grid item>
                        <Tooltip title="Alerts • No alerts">
                            <IconButton color="inherit">
                                <NotificationsIcon/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <IconButton color="inherit" sx={{p: 0.5}}>
                            <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar"/>
                        </IconButton>
                    </Grid>
                    {user && <Grid item>
                        <Typography variant={'body2'}>{user.name}</Typography>
                    </Grid>}
                    <Grid item>
                        <IconButton color="inherit" sx={{p: 0.5}} onClick={logOut}>
                            <Logout/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    </React.Fragment>);
}

Header.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
