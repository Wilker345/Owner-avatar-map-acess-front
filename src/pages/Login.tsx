import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Container, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '@/utils/axios';

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

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      await api.post('/login', data);
      navigate('/');
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
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
        <Typography variant="body2" sx={{ mt: 2 }}>
          Não tem uma conta?{' '}
          <Link component="button" variant="body2" onClick={() => navigate('/register')}>
            Cadastre-se
          </Link>
        </Typography>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Entrar
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
