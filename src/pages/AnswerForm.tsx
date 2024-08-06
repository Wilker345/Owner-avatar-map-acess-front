import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Container, Box, Typography, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '@/utils/axios';

const schema = z.object({
  text: z.string().min(1, "Texto da resposta é obrigatório"),
  question_id: z.number().min(1, "Questão é obrigatória")
});


type FormData = z.infer<typeof schema>;

const AnswerForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { data: questions } = useQuery({
    queryKey: ['questions'],
    queryFn: async () => {
      const response = await api.get('/questions');
      return response.data;
    }
  });

  const onSubmit: SubmitHandler<FormData> = async data => {
    const navigate = useNavigate();

    try {
      await api.post('/answers', {
        text: data.text,
        question_id: data.question_id,
        other: false
      });
      navigate("/form");
    } catch (error) {
      return(<h3>Erro ao cadastrar resposta</h3>);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro de Respostas
        </Typography>
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Texto da Resposta"
              margin="normal"
              {...field}
              error={!!errors.text}
              helperText={errors.text ? errors.text.message : ""}
            />
          )}
        />
        <FormControl fullWidth margin="normal" error={!!errors.question_id}>
          <InputLabel id="question-label">Questão</InputLabel>
          <Controller
            name="question_id"
            control={control}
            render={({ field }) => (
              <Select
                labelId="question-label"
                {...field}
              >
                {questions?.map((question: { id: number; text: string }) => (
                  <MenuItem key={question.id} value={question.id}>
                    {question.text}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.question_id && (
            <FormHelperText>{errors.question_id.message}</FormHelperText>
          )}
        </FormControl>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Cadastrar
        </Button>
      </Box>
    </Container>
  );
};

export default AnswerForm;
