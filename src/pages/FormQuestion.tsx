import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
} from '@mui/material';
import ListQuestions from '@/components/ListQuestions';
import PageNav from "@/components/PageNav";
import Question from '@/components/Question';

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email é obrigatório'),
  questions: z.array(
    z.object({
      answers: z.array(z.string()),
      otherAnswer: z.string().optional(),
    })
  ).nonempty('É necessário pelo menos uma pergunta'),
});

type FormData = z.infer<typeof schema>;

export const FormComponent: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      questions: [{ answers: [], otherAnswer: '' }],
    },
  });

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log(data);
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Formulário
        </Typography>
        <TextField
          fullWidth
          label="Nome"
          margin="normal"
          {...register('nome')}
          error={!!errors.nome}
          helperText={errors.nome ? errors.nome.message : ''}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />
        <ListQuestions control={control} />
        <Question />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Enviar
        </Button>      
      </Box>
    </Container>
  );
};

export default FormComponent;
