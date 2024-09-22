import { Box, Typography, Button, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Container } from 'react-bootstrap';
import LandingPic from '../Assets/LandingPic.gif';

function HomeContent() {
    return (
        <>
        <div className="home-content"><Box sx={{ flexGrow: 1, paddingTop: '20px', marginTop: '40px' }}>
                <Container>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6} className="image-section">
                            <img
                                src={LandingPic}
                                alt="Animated Illustration"
                                className="animated-svg"
                            />
                        </Grid>

                        
                        <Grid item xs={12} md={6} className="text-section">
                            <Typography variant="h2" gutterBottom>
                                Welcome to <span style={{ color: "rgb(51, 128, 255)" }}>QuickShare</span>
                            </Typography>
                            <Typography variant="h5" paragraph>
                                Easily upload and share your files securely with our easy-to-use platform.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<CloudUploadIcon />}
                                href="/signup"
                                size="large"
                            >
                                Get Started
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            </div>
        </>
    )
}

export default HomeContent;