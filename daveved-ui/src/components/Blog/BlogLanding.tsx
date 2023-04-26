import { useState } from 'react';
import { AppBar, Toolbar, Typography, Card, CardContent, CardActions, Button, Box, TextField, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility } from '@mui/icons-material';

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

const blogPosts = [
    {
        id: 1,
        title: 'Deploy a custom site using S3 & CloudFront in minutes!',
        date: '01/01/2023',
        views: 0,
        contentUrl: 'content/deploy-a-custom-site-using-s3-&-cloudfront-in-minutes.html',
    },
    {
        id: 2,
        title: 'Another blog post',
        date: '02/01/2023',
        views: 0,
        contentUrl: 'content/another-blog-post.html',
    },
    // Add more blog posts here
];

const BlogLanding = () => {
    const [isCardHovered, setIsCardHovered] = useState(0);
    const [searchValue, setSearchValue] = useState('');

    const handleCardClick = () => {
        console.log('card clicked');
    };

    const filteredPosts = blogPosts.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase()));

    return (
        <ThemeProvider theme={theme}>
            <main>
                <Container maxWidth="md" sx={{ marginTop: '5rem' }}>
                    <Box sx={{ textAlign: 'center', marginTop: '3rem', marginBottom: '2rem' }}>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>Posts</Typography>
                    </Box>
                    <Box sx={{ marginBottom: '2rem' }}>
                        <TextField
                            fullWidth
                            label="Search Posts"
                            variant="outlined"
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                        />
                    </Box>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {filteredPosts.map((post) => (
                            <Card
                                key={post.id}
                                sx={{
                                    width: '100%',
                                    marginBottom: '1rem',
                                    boxShadow: isCardHovered === post.id ? '0px 0px 20px rgba(0, 0, 0, 0.2)' : '0px 0px 10px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '5px',
                                    transition: 'box-shadow 0.3s ease-in-out',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
                                    },
                                }}
                                onClick={handleCardClick}
                                onMouseEnter={() => setIsCardHovered(post.id)}
                                onMouseLeave={() => setIsCardHovered(0)}
                            >
                                <a href={post.contentUrl} style={{ textDecoration: 'none' }}>
                                    <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#2c387e' }}>
                                                {post.title}
                                            </Typography>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography
                                                    variant="subtitle2"
                                                    color="secondary"
                                                    sx={{ marginRight: '1rem', fontSize: '0.9rem' }}
                                                >
                                                    {post.date}
                                                </Typography>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Visibility color="secondary" sx={{ marginRight: '0.5rem' }} />
                                                    <Typography variant="subtitle2" color="secondary">
                                                        {post.views}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                        <CardActions>
                                            <Button variant="contained" color="primary" sx={{
                                                '&:hover': {
                                                    backgroundColor: '#218838',
                                                },
                                            }}>
                                                Read More
                                            </Button>
                                        </CardActions>
                                    </CardContent>
                                </a>
                            </Card>
                        ))}
                    </div>
                </Container>
            </main>
        </ThemeProvider>
    );
};
export default BlogLanding;