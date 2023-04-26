import React from 'react';
import { IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#9e9e9e',
        },
    },
});

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const [selected, setSelected] = React.useState('Home');
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleSelect = (value: string) => {
        setSelected(value);
        setDrawerOpen(false);
    };

    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };

    const list = (
        <List sx={{ padding: '16px' }}>
            <ListItem button component={Link} to="/" onClick={() => handleSelect('Home')}>
                <ListItemIcon sx={{ color: selected === 'Home' ? theme.palette.primary.main : 'inherit' }}><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" sx={{ fontWeight: selected === 'Home' ? 'bold' : 'normal', color: selected === 'Home' ? theme.palette.primary.main : 'inherit' }} />
            </ListItem>
            <ListItem button component={Link} to="/blog" onClick={() => handleSelect(title)}>
                <ListItemIcon sx={{ color: selected === title ? theme.palette.primary.main : 'inherit' }}><PostAddIcon /></ListItemIcon>
                <ListItemText primary={title} sx={{ fontWeight: selected === title ? 'bold' : 'normal', color: selected === title ? theme.palette.primary.main : 'inherit' }} />
            </ListItem>
        </List>
    );

    return (
        <ThemeProvider theme={theme}>
            <IconButton
                edge="start"
                color="primary"
                aria-label="menu"
                sx={{ mr: 2, marginLeft: '30px', marginTop: '15px' }}
                onClick={() => toggleDrawer(true)}
            >
                <MenuIcon sx={{ fontSize: '28px', fontWeight: 'bold' }} />
            </IconButton>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
                onClick={() => toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: '240px',
                        backgroundColor: '#f5f5f5',
                        borderRight: 'none',
                        boxShadow: '4px 0px 12px rgba(0, 0, 0, 0.15)',
                    },
                }}
            >
                {list}
            </Drawer>
        </ThemeProvider>
    );
};

export default Header;
