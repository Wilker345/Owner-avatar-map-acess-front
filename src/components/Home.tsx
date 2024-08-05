import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, Typography, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/axios';

type UserGroup = {
  id: string;
  name: string;
};

const fetchUserGroups = async () => {
  const response = await api.get('/user-groups');
  return response.data;
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<{ userGroup: string }>({
    defaultValues: {
      userGroup: '',
    },
  });

  const { data, isLoading, error } = useQuery<UserGroup[]>({
    queryKey: ['userGroups'],
    queryFn: fetchUserGroups,
  });

  const onSubmit = (data: { userGroup: string }) => {
    console.log('Selected User Group:', data.userGroup);
    navigate('/register', { state: { userGroup: data.userGroup } });
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Erro ao carregar os grupos de usuários</div>;

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Selecione um Grupo de Usuários
        </Typography>
        <FormControl component="fieldset">
          <Controller
            name="userGroup"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
                {data?.map((group) => (
                  <FormControlLabel
                    key={group.id}
                    value={group.id}
                    control={<Radio />}
                    label={group.name}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Avançar
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
