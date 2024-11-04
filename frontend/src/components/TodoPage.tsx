import { Check, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [ tasks, setTasks ] = useState<Task[]>([]);
  const [ newTaskName, setNewTaskName ] = useState('');

  const fetchTasks = async () => {
    setTasks(await api.get('/tasks'));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    if (newTaskName.trim()) {
      try {
        await api.post('/tasks', { name: newTaskName });
        fetchTasks();
        setNewTaskName('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2" color="primary">
          HDM Todo List
        </Typography>
      </Box>

      <Box
        justifyContent="center"
        mt={5}
        flexDirection="column"
        sx={{ maxWidth: 400, margin: '0 auto' }}
      >
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <TextField
            size="small"
            value={newTaskName}
            onChange={(e:any) => setNewTaskName(e.target.value)}
            fullWidth
            sx={{ backgroundColor: '#fff' }}
            placeholder="Ajouter une nouvelle tâche"
            variant="outlined"
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: 'green', color: '#fff', ml: 1 }}
            onClick={handleSave}
          >
            Ajouter
          </Button>
        </Box>

        <Box mt={2}>
          {tasks.map((task) => (
            <Card
              key={task.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 1,
                backgroundColor: '#fff',
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ color: '#333' }}>
                  {task.name}
                </Typography>
              </CardContent>
              <Box>
                <IconButton color="success" disabled>
                  <Check />
                </IconButton>
                <IconButton
                  sx={{ color: '#d65f0d' }}
                  onClick={() => handleDelete(task.id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
