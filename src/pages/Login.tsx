import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Container, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const schema = z.object({
  email: z.string().email("Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { login } = useAuth();

  const onSubmit: SubmitHandler<FormData> = async data => {
    login(data.email, data.password);
    navigate('/form');
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
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
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Entrar
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
