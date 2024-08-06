import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Container, Box, Typography, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const fetchQuestions = async (userId: number) => {
  const { data } = await axios.get(`${process.env.BACKEND_URL}/questions`, {
    params: { user_id: userId }
  });
  return data;
};

const MainForm: React.FC<{ userId: number }> = ({ userId }) => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery(['questions', userId], () => fetchQuestions(userId));

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});

  const handleChange = (questionId: number, answerId: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleSubmit = () => {
    console.log(selectedAnswers);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading questions</div>;

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {data.questions.map((question: any) => (
          <Box key={question.id} sx={{ mb: 3 }}>
            <Typography variant="h6">{question.text}</Typography>
            <RadioGroup
              value={selectedAnswers[question.id] || ''}
              onChange={(e) => handleChange(question.id, Number(e.target.value))}
            >
              {question.answers.map((answer: any) => (
                <FormControlLabel
                  key={answer.id}
                  value={answer.id}
                  control={<Radio />}
                  label={answer.text}
                />
              ))}
            </RadioGroup>
          </Box>
        ))}
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </Box>
    </Container>
  );
};

export default MainForm;
