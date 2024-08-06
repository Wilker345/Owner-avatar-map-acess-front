import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Container, Box, Typography, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/axios';

const schema = z.object({
  text: z.string().min(1, "Texto da questão é obrigatório"),
  user_group_id: z.number().min(1, "Grupo de usuário é obrigatório")
});

type FormData = z.infer<typeof schema>;

const QuestionForm: React.FC = () => {
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

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      await api.post('/questions', {
        text: data.text,
        user_group_id: data.user_group_id
      });
    } catch (error) {
      console.error("Erro ao cadastrar questão", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro de Questões
        </Typography>
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Texto da Questão"
              margin="normal"
              {...field}
              error={!!errors.text}
              helperText={errors.text ? errors.text.message : ""}
            />
          )}
        />
        <FormControl fullWidth margin="normal" error={!!errors.user_group_id}>
          <InputLabel id="user-group-label">Grupo de Usuários</InputLabel>
          <Controller
            name="user_group_id"
            control={control}
            render={({ field }) => (
              <Select
                labelId="user-group-label"
                {...field}
              >
                {userGroups?.map((group: { id: number; text: string }) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.text}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.user_group_id && (
            <FormHelperText>{errors.user_group_id.message}</FormHelperText>
          )}
        </FormControl>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Cadastrar
        </Button>
      </Box>
    </Container>
  );
};

export default QuestionForm;
