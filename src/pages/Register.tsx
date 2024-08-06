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
  user_groups: z.number()
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
      
    } else {
      const groupId = data.user_groups;

      const groupResponse = await api.get(`/user-groups/${groupId}`)

      selectedGroups = groupResponse.data;
    }

    try {
      console.log(selectedGroups);
      await api.post('/users', {
        phone_number: data.phone_number,
        email: data.email,
        password: data.password,
        user_groups: [selectedGroups],
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
        <FormControl fullWidth margin="normal" error={!!errors.user_groups}>
          <InputLabel id="user-group-label">Grupo de Usuários</InputLabel>
          <Controller
            name="user_groups"
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
          {errors.user_groups && (
            <FormHelperText>{errors.user_groups.message}</FormHelperText>
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