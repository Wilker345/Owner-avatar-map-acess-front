import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Container, Box, Typography, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/axios';

const schema = z.object({
  phone_number: z.string().min(10, "Número de telefone é obrigatório"),
  email: z.string().email("Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  user_group: z.string().optional()
});

type FormData = z.infer<typeof schema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { data: userGroups } = useQuery({
    queryKey: ['userGroups'],
    queryFn: async () => {
      const response = await api.get('/user-groups');
      return response.data;
    }
  });

  const [newGroup, setNewGroup] = useState('');

  const onSubmit: SubmitHandler<FormData> = async data => {
    let selectedGroups;

    console.log(data)

    if (newGroup) {
      const groupResponse = await api.post('/user-groups', { text: newGroup });
      selectedGroups = [{ id: groupResponse.data.id, text: newGroup }];
    } else {
      selectedGroups = userGroups.filter((group: { id: number; text: string }) => group.id === parseInt(data.user_group));
    }

    try {
      await api.post('/users', {
        ...data,
        user_groups: selectedGroups,
      });
      navigate('/login');
    } catch (error) {
      console.error("Erro ao registrar", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro
        </Typography>
        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Número de Telefone"
              margin="normal"
              {...field}
              error={!!errors.phone_number}
              helperText={errors.phone_number ? errors.phone_number.message : ""}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              {...field}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              type="password"
              label="Senha"
              margin="normal"
              {...field}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
          )}
        />
        <FormControl fullWidth margin="normal" error={!!errors.user_group}>
          <InputLabel id="user-group-label">Grupo de Usuários</InputLabel>
          <Controller
            name="user_group"
            control={control}
            render={({ field }) => (
              <Select
                labelId="user-group-label"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setNewGroup('');
                }}
              >
                {userGroups?.map((group: { id: number; text: string }) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.text}
                  </MenuItem>
                ))}
                <MenuItem value="">
                  Ou crie um novo grupo
                </MenuItem>
              </Select>
            )}
          />
          {errors.user_group && (
            <FormHelperText>{errors.user_group.message}</FormHelperText>
          )}
        </FormControl>
        <TextField
          fullWidth
          label="Novo Grupo de Usuários"
          margin="normal"
          value={newGroup}
          onChange={(e) => {
            setNewGroup(e.target.value);
          }}
          helperText="Deixe em branco se selecionar um grupo existente"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Registrar
        </Button>
      </Box>
    </Container>
  );
};

export default Register;