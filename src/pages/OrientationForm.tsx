// src/components/GuidanceForm.tsx
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Container, Box, Typography, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/axios';

const schema = z.object({
  text: z.string().min(1, "Texto da orientação é obrigatório"),
  value: z.number().min(0, "Valor é obrigatório"),
  answer_id: z.string().min(1, "Resposta é obrigatória")
});

type FormData = z.infer<typeof schema>;

const OrientationForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { data: answers } = useQuery({
    queryKey: ['answers'],
    queryFn: async () => {
      const response = await api.get('/answers');
      return response.data;
    }
  });

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      await api.post('/guidances', {
        ...data,
        answer_id: parseInt(data.answer_id)
      });
      // Optionally, redirect or clear the form after successful submission
    } catch (error) {
      console.error("Erro ao cadastrar orientação", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro de Orientações
        </Typography>
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Texto da Orientação"
              margin="normal"
              {...field}
              error={!!errors.text}
              helperText={errors.text ? errors.text.message : ""}
            />
          )}
        />
        <Controller
          name="value"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              type="number"
              label="Valor"
              margin="normal"
              {...field}
              error={!!errors.value}
              helperText={errors.value ? errors.value.message : ""}
            />
          )}
        />
        <FormControl fullWidth margin="normal" error={!!errors.answer_id}>
          <InputLabel id="answer-label">Resposta</InputLabel>
          <Controller
            name="answer_id"
            control={control}
            render={({ field }) => (
              <Select
                labelId="answer-label"
                {...field}
              >
                {answers?.map((answer: { id: number; text: string }) => (
                  <MenuItem key={answer.id} value={answer.id}>
                    {answer.text}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.answer_id && (
            <FormHelperText>{errors.answer_id.message}</FormHelperText>
          )}
        </FormControl>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Cadastrar
        </Button>
      </Box>
    </Container>
  );
};

export default OrientationForm;
