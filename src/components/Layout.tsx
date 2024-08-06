import React from 'react';
import { Outlet } from 'react-router-dom';
import PageNav from './PageNav';
import { Container, Box } from '@mui/material';

const Layout: React.FC = () => {
    return (
        <Box>
            <PageNav />
            <Container maxWidth="lg" sx={{ mt: 12 }}>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout;
