import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Landing = () => {
    return (
        <Box
            component="main"
            sx={{
                minHeight: '60vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <Container maxWidth="md">
                <Typography
                    variant="h4"
                    color="primary"
                    align="center"
                    gutterBottom
                    sx={{
                        fontFamily: 'Courier, monospace',
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        textShadow: '1px 1px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    Hey, I'm
                </Typography>
                <Typography
                    variant="h3"
                    color="primary"
                    align="center"
                    gutterBottom
                    sx={{
                        fontFamily: 'Courier, monospace',
                        fontWeight: 'bold',
                        textShadow: '2px 2px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    Dave Dennis
                </Typography>
            </Container>
        </Box>
    );
};

export default Landing;
