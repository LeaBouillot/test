import { Check, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";

const TodoPage = () => {
  const [tasks, setTasks] = useState<{ id: number; name: string }[]>([]);
  const [newTaskName, setNewTaskName] = useState("");

  useEffect(() => {
    const initialTasks = [
      { id: 1, name: "Acheter des courses" },
      { id: 2, name: "Faire du sport" },
      { id: 3, name: "Lire un livre" },
    ];
    setTasks(initialTasks);
  }, []);

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSave = () => {
    if (newTaskName.trim() === "") return;
    const newTask = { id: Date.now(), name: newTaskName };
    setTasks([...tasks, newTask]);
    setNewTaskName("");
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
        sx={{ maxWidth: 400, margin: "0 auto" }}
      >
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <TextField
            size="small"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            fullWidth
            sx={{ backgroundColor: "#fff" }}
            placeholder="Ajouter une nouvelle tâche"
            variant="outlined"
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "green", color: "#fff", ml: 1 }}
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
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 1,
                backgroundColor: "#fff",
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ color: "#333" }}>
                  {task.name}
                </Typography>
              </CardContent>
              <Box>
                <IconButton color="success" disabled>
                  <Check />
                </IconButton>
                <IconButton
                  sx={{ color: "#d65f0d" }}
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
