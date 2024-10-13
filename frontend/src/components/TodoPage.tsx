import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const TodoPage = () => {
  const [tasks, setTasks] = useState<{ id: number; name: string }[]>([]);
  const [newTaskName, setNewTaskName] = useState('');

  // Simule des données initiales
  useEffect(() => {
    const initialTasks = [
      { id: 1, name: 'Acheter des courses' },
      { id: 2, name: 'Faire du sport' },
      { id: 3, name: 'Lire un livre' },
    ];
    setTasks(initialTasks);
  }, []);

  const handleDelete = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleSave = () => {
    if (newTaskName.trim() === '') return; // Ne pas sauvegarder si le champ est vide

    const newTask = { id: Date.now(), name: newTaskName }; // Crée un ID unique
    setTasks([...tasks, newTask]);
    setNewTaskName(''); // Réinitialiser le champ d'entrée
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <TextField
            size="small"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            fullWidth
            sx={{ maxWidth: 350 }}
            placeholder="Ajouter une nouvelle tâche"
          />
          <Button variant="outlined" onClick={handleSave}>
            Ajouter une tâche
          </Button>
        </Box>

        {/* Affichage des tâches ajoutées */}
        <Box mt={2}>
          {tasks.map((task) => (
            <Box key={task.id} display="flex" justifyContent="center" alignItems="center" mt={1} gap={1} width="100%">
              <TextField size="small" value={task.name} fullWidth sx={{ maxWidth: 350 }} disabled />
              <Box>
                <IconButton color="success" disabled>
                  <Check />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(task.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
