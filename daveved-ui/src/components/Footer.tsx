import React, { useState } from 'react';
import { Box, Container, Grid, Link, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { Send, Twitter, Instagram, GitHub } from '@mui/icons-material';

interface FooterProps { }

const Footer: React.FC<FooterProps> = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Email submitted:', email);
    };

    return (
        <Box component="footer" sx={{
            backgroundColor: '#fafafa',
            paddingTop: '2rem',
            paddingBottom: '2rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0
        }}>
            <Container maxWidth="md">
                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Grid container justifyContent="center">
                            <IconButton component={Link} href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" color="primary">
                                <Twitter />
                            </IconButton>
                            <IconButton component={Link} href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" color="primary">
                                <Instagram />
                            </IconButton>
                            <IconButton component={Link} href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" color="primary">
                                <GitHub />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Subscribe to my content"
                                variant="outlined"
                                value={email}
                                onChange={handleEmailChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '25px',
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton type="submit" edge="end">
                                                <Send />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
