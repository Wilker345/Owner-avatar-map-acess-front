// src/pages/Reports.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Container, Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '@/utils/axios';

const fetchResponses = async () => {
  const { data } = await api.get(`/responses`);
  return data;
};

const Reports: React.FC = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery({
    queryKey: ['responses'],
    queryFn: fetchResponses
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reports</div>;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Relatórios
        </Typography>
        <Typography variant="h6">
          Quantidade de Relatórios Disponíveis: {data.length}
        </Typography>
        <List>
          {data.map((response: any) => (
            <ListItem key={response.id} sx={{ mb: 2 }}>
              <ListItemText primary={`Relatório ${response.id}`} />
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/reports/${response.id}`)}
              >
                Ver Relatório
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Reports;
