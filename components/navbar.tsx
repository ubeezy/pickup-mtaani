
import * as React from 'react';
import { useRouter } from "next/router";
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { IconButton, Button, AppBar, Avatar, Box, CssBaseline, Divider, GlobalStyles, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';

import { toggleColorMode } from '../redux/themeSlice';
import { clearUserProfile } from '../redux/userProfileSlice'
import { RootState } from "../redux/types";

export default function Navbar() {
    const session = useSession();
    const router = useRouter();
    const theme = useTheme();
    const user = useUser();
    const dispatch = useDispatch();
    const userProfile = useSelector((state: RootState) => state.userProfile);
    const supabaseClient = useSupabaseClient()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        router.push(`/signin`)
        supabaseClient.auth.signOut()
        dispatch(clearUserProfile())
    };

    const handleDarkModeToggle = () => {
        dispatch(toggleColorMode());
    };

    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <AppBar
                position="static"
                color="inherit"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>

                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        {userProfile.company || "Mtaani"}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <MenuItem onClick={() => router.push("/")}>
                            <ListItemIcon>
                                <HomeIcon fontSize="small" color="secondary" />
                            </ListItemIcon>
                            Home
                        </MenuItem>
                        <MenuItem onClick={() => router.push("/inventory")}>
                            <ListItemIcon>
                                <InventoryIcon fontSize="small" color="secondary" />
                            </ListItemIcon>
                            Inventory
                        </MenuItem>
                        <MenuItem onClick={() => router.push("/orders")}>
                            <ListItemIcon>
                                <SendIcon fontSize="small" color="secondary" />
                            </ListItemIcon>
                            Orders
                        </MenuItem>
                        <MenuItem onClick={() => router.push("/clients")}>
                            <ListItemIcon>
                                <PeopleIcon fontSize="small" color="secondary" />
                            </ListItemIcon>
                            Clients
                        </MenuItem>
                    </Box>

                    <div>
                        <Tooltip title="Toggle theme">
                            <IconButton onClick={handleDarkModeToggle} color="inherit">
                                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                        </Tooltip>
                        {!session ? (<Button onClick={() => router.push("/signin")} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                            Login
                        </Button>) : (
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar src={userProfile.avatar_url ? `https://aaepbxpivppmvuaemajn.supabase.co/storage/v1/object/public/avatars/${userProfile.avatar_url}` : user?.user_metadata?.avatar_url} sx={{ width: 32, height: 32 }} />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar src={userProfile.avatar_url ? `https://aaepbxpivppmvuaemajn.supabase.co/storage/v1/object/public/avatars/${userProfile.avatar_url}` : user?.user_metadata?.avatar_url} />
                                    </ListItemAvatar>
                                    <ListItemText primary={userProfile.username || user?.user_metadata?.name || "Signed in as:"} secondary={session?.user?.email || "Not signed in"} />
                                </ListItem>
                            </List>
                            <Divider />
                            <MenuItem onClick={() => router.push("/")}>
                                <ListItemIcon>
                                    <HomeIcon fontSize="small" color="secondary" />
                                </ListItemIcon>
                                Dashboard
                            </MenuItem>
                            <MenuItem onClick={() => router.push("/settings")}>
                                <ListItemIcon>
                                    <Settings fontSize="small" color="secondary" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>

                            <MenuItem onClick={handleLogout}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="warning"
                                    onClick={handleLogout}
                                    size="small"
                                    sx={{ borderRadius: "0.4rem" }}
                                >
                                    Logout
                                </Button>
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}