import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Container, Box, Typography, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageNav from '@/components/PageNav';

const fetchQuestionsByUser = async (userId: number) => {
  const { data } = await axios.get(`http://127.0.0.1:8000/users/${userId}/form`);
  return data;
};

const fetchAnswer = async (questionId: number) => {
  const { data } = await axios.get(`http://127.0.0.1:8000/answers/${questionId}`);
  return data;
};

const MainForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ['questions'],
    queryFn: () => fetchQuestionsByUser(user?.id || 1)
  });

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});

  const handleChange = (questionId: number, answerId: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const formatResponse = async () => {
    const questionIds = Object.values(selectedAnswers).map(Number);

    try {
      const answers = await Promise.all(
        questionIds.map((questionId) => fetchAnswer(questionId))
      );

      return answers;
    } catch (error) {
      
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { data } = await axios.post(`http://127.0.0.1:8000/responses`, {
      answers: await formatResponse(),
      user_id: user?.id || 1,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{(error as Error).message}</div>;

  const questions = data || [];

  return (
    <Container maxWidth="sm">
      <PageNav />
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {questions.length > 0 ? (
          questions.map((question: any) => (
            <Box key={question.id} sx={{ mb: 3 }}>
              <Typography variant="h6">{question.text}</Typography>
              <RadioGroup
                value={selectedAnswers[question.id] || ''}
                onChange={(e) => handleChange(question.id, Number(e.target.value))}
              >
                {question.answers?.map((answer: any) => (
                  <FormControlLabel
                    key={answer.id}
                    value={answer.id}
                    control={<Radio />}
                    label={answer.text}
                  />
                ))}
              </RadioGroup>
            </Box>
          ))
        ) : (
          <Typography>Sem questões cadastradas</Typography>
        )}
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </Box>
    </Container>
  );
};

export default MainForm;
