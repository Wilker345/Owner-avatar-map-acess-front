// src/pages/ReportDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Container, Box } from '@mui/material';
import api from '@/utils/axios';

const fetchReport = async (id: number) => {
  const { data } = await api.get(`/responses/${id}/report`);
  return data;
};

const ReportDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useQuery({
    queryKey: ['report', id],
    queryFn: () => fetchReport(Number(id))
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading report</div>;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 3 }} dangerouslySetInnerHTML={{ __html: data }} />
    </Container>
  );
};

export default ReportDetail;
